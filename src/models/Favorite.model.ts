import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import User from "./User.model";
import Novel from "./Novel.model";

@Table({ tableName: "favorite" })
class Favorite extends Model <Favorite> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare userId: number;

  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare novelId: number;
}

export default Favorite;