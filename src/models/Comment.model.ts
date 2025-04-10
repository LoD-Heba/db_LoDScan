// src/models/Comment.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User.model';
import Novel from './Novel.model';
import Chapter from './Chapter.model';

@Table({
  tableName: 'comments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare novel_id: number;

  @BelongsTo(() => Novel)
  declare novel: Novel;

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  declare chapter_id: number | null;

  @BelongsTo(() => Chapter)
  declare chapter: Chapter;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare comment: string;
}

export default Comment;