import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,  
} from "sequelize-typescript";
import { INovelAttributes, INovelCreationAttributes } from "../interfaces/novel.interface";
import User from "./User.model";
import NovelType from "./NovelType.model";
import NovelGenre from "./NovelGenre.model";
import Chapter from "./Chapter.model";
import Rating from "./Rating.model";

@Table({ tableName: "novel" })
class Novel extends Model<INovelAttributes, INovelCreationAttributes>
 {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare title: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.STRING(255))
  declare coverImage: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare authorId: number;

  @ForeignKey(() => NovelType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare typeId: number;

  @BelongsTo(() => User)
  declare author: User;

  @BelongsTo(() => NovelType)
  declare type: NovelType;

  @HasMany(() => NovelGenre)
  declare genres: NovelGenre[];

  @HasMany(() => Chapter)
  declare chapters: Chapter[];

  @HasMany(() => Rating)
  declare ratings: Rating[];
}

export default Novel;
