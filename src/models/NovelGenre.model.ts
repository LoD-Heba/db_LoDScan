// src/models/NovelGenre.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Novel from './Novel.model';
import Genre from './Genre.model';

@Table({
  tableName: 'novel_genres',
  timestamps: false
})
class NovelGenre extends Model {
  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare novel_id: number;

  @BelongsTo(() => Novel)
  declare novel: Novel;

  @ForeignKey(() => Genre)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare genre_id: number;

  @BelongsTo(() => Genre)
  declare genre: Genre;
}

export default NovelGenre;