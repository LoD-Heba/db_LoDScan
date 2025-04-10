// src/models/Genre.model.ts
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import NovelGenre from './NovelGenre.model';

@Table({
  tableName: 'genres',
  timestamps: false
})
class Genre extends Model {
  // ID único del género
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  // Nombre del género (debe ser único)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  })
  declare name: string;

  // Relación muchos-a-muchos con Novelas (a través de NovelGenre)
  @HasMany(() => NovelGenre)
  declare novel_genres: NovelGenre[];
}

export default Genre;