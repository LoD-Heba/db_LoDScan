import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./User.model";
import Chapter from "./Chapter.model";

@Table({ tableName: "comment" })
class Comment extends Model <Comment>{
  @Column(DataType.TEXT)
  declare content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare userId: number;

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare chapterId: number;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Chapter)
  declare chapter: Chapter;
}

export default Comment;