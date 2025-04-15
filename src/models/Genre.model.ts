import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import NovelGenre from "./NovelGenre.model";

@Table({ tableName: "genre" })
class Genre extends Model <Genre>{
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  declare name: string; // Ej: 'Fantasy', 'Romance', 'Isekai'

  @HasMany(() => NovelGenre)
  declare novelGenres: NovelGenre[];
}

export default Genre;