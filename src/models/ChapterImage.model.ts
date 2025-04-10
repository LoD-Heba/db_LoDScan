// src/models/ChapterImage.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Chapter from './Chapter.model';

@Table({
  tableName: 'chapter_images',
  timestamps: false
})
class ChapterImage extends Model {
  // ID único de la imagen
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  // Capítulo al que pertenece
  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare chapter_id: number;

  // Instancia del capítulo (para eager loading)
  @BelongsTo(() => Chapter)
  declare chapter: Chapter;

  // URL de la imagen
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  })
  declare image_url: string;

  // Posición en el capítulo (para ordenar las imágenes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1 // La posición empieza en 1
    }
  })
  declare position: number;
}

export default ChapterImage;