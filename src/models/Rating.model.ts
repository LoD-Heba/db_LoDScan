import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import User from "./User.model";
import Novel from "./Novel.model";
import { IRatingAttributes, IRatingCreationAttributes } from "../interfaces/rating.interface";

@Table({ tableName: "rating" })
class Rating extends Model <IRatingAttributes, IRatingCreationAttributes>{
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  })
  declare value: number;

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

export default Rating;