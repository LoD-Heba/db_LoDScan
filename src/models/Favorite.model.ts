import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import User from "./User.model";
import Novel from "./Novel.model";
import { IFavoriteAttributes } from "../interfaces/favorite.interface";

@Table({ tableName: "favorite" })
class Favorite extends Model<IFavoriteAttributes> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare novelId: number;
}

export default Favorite;
