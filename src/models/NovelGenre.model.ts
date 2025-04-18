import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import Novel from "./Novel.model";
import Genre from "./Genre.model";
import { INovelGenreAttributes } from "../interfaces/novelGenre.interface";

@Table({ tableName: "novel_genre" })
class NovelGenre extends Model<INovelGenreAttributes> {
  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare novelId: number;

  @ForeignKey(() => Genre)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare genreId: number;
}

export default NovelGenre;
