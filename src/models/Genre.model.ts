import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import NovelGenre from "./NovelGenre.model";
import { IGenreAttributes } from "../interfaces/genre.interface";

@Table({ tableName: "genre" })
class Genre extends Model<IGenreAttributes> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @HasMany(() => NovelGenre)
  declare novelGenres: NovelGenre[];
}

export default Genre;
