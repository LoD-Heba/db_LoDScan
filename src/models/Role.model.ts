import { Table, Model, Column, DataType, HasMany, Unique } from "sequelize-typescript";
import User from "./User.model";

@Table({ tableName: "role" })
class Role extends Model <Role>{
  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  declare name: string; // Ej: 'Admin', 'Translator', 'User'

}

export default Role;