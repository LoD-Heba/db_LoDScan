// src/models/Chapter.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Novel from './Novel.model';
import ChapterImage from './ChapterImage.model';
import Comment from './Comment.model';

@Table({
  tableName: 'chapters',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
class Chapter extends Model {
  // ID único del capítulo
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  // Novela a la que pertenece
  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare novel_id: number;

  // Instancia de la novela (para eager loading)
  @BelongsTo(() => Novel)
  declare novel: Novel;

  // Número de capítulo (para ordenación)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1 // No puede ser menor que 1
    }
  })
  declare chapter_number: number;

  // Título del capítulo
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  declare title: string;

  // Contenido del capítulo (texto para novelas, o descripción para mangas)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  declare content: string;

  // Relaciones con otros modelos:

  // Imágenes del capítulo (para mangas/manhwas)
  @HasMany(() => ChapterImage)
  declare images: ChapterImage[];

  // Comentarios específicos del capítulo
  @HasMany(() => Comment)
  declare comments: Comment[];
}

export default Chapter;