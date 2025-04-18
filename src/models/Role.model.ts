import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  Unique,
} from "sequelize-typescript";
import User from "./User.model";
import {
  IRoleAttributes,
  IRoleCreationAttributes,
} from "../interfaces/role.interface";

@Table({ tableName: "role" })
class Role extends Model<IRoleAttributes, IRoleCreationAttributes> {
  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @HasMany(() => User)
  declare users: User[];
}

export default Role;
