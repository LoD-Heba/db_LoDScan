import { Column, DataType, Unique, HasMany } from "sequelize-typescript";

const { Model } = require("sequelize");
const { Table } = require("sequelize-typescript");

@Table ({ tableName: "userRols"})
class RoleUser extends Model<RoleUser>{

    @Unique
@Column({type: DataType.STRING(20)})
declare name: string;

@Column({type: DataType.STRING(200)})
declare description: string;

// @HasMany(() => User)
// declare users: User[];

}



export default RoleUser;