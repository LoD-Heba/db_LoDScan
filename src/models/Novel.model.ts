// src/models/Novel.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from './User.model';
import NovelType from './NovelType.model';
import NovelGenre from './NovelGenre.model';
import Chapter from './Chapter.model';
import Comment from './Comment.model';
import Favorite from './Favorite.model';
import Rating from './Rating.model';

@Table({
  tableName: 'novels',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
class Novel extends Model {
  // ID único de la novela
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  // Título de la obra
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  declare title: string;

  // Slug para URLs amigables (debe ser único)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      is: /^[a-z0-9-]+$/ // Solo letras minúsculas, números y guiones
    }
  })
  declare slug: string;

  // Autor de la obra (puede ser diferente al uploader)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  declare author: string;

  // Sinopsis breve (visible en listados)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [50, 500] // Entre 50 y 500 caracteres
    }
  })
  declare synopsis: string;

  // Descripción detallada (página de la novela)
  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare description: string;

  // Portada de la novela (URL a la imagen)
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  })
  declare cover_image: string;

  // Estado de publicación
  @Column({
    type: DataType.ENUM('ongoing', 'completed', 'hiatus'),
    allowNull: false,
    defaultValue: 'ongoing',
    validate: {
      notEmpty: true
    }
  })
  declare status: string;

  // Relación con el usuario que subió la novela
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare uploader_id: number;

  // Instancia del usuario uploader (para eager loading)
  @BelongsTo(() => User)
  declare uploader: User;

  // Tipo de novela (Manga, Novela Ligera, etc.)
  @ForeignKey(() => NovelType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare type_id: number;

  // Instancia del tipo de novela
  @BelongsTo(() => NovelType)
  declare type: NovelType;

  // Relaciones con otros modelos:

  // Géneros asociados (a través de tabla intermedia)
  @HasMany(() => NovelGenre)
  declare genres: NovelGenre[];

  // Capítulos de la novela
  @HasMany(() => Chapter)
  declare chapters: Chapter[];

  // Comentarios sobre la novela
  @HasMany(() => Comment)
  declare comments: Comment[];

  // Usuarios que la tienen como favorita
  @HasMany(() => Favorite)
  declare favorites: Favorite[];

  // Ratings recibidos
  @HasMany(() => Rating)
  declare ratings: Rating[];
}

export default Novel;