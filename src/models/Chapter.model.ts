import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Novel from "./Novel.model";
import Comment from "./Comment.model";
import { IChapterAttributes } from "../interfaces/chapter.interface";

@Table({ tableName: "chapter" })
class Chapter extends Model<IChapterAttributes> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare title: string;

  @Column(DataType.TEXT)
  declare content: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare chapterNumber: number;

  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare novelId: number;

  @BelongsTo(() => Novel)
  declare novel: Novel;

  @HasMany(() => Comment)
  declare comments: Comment[];
}

export default Chapter;
