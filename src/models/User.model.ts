import { DataTypes } from "sequelize";
import { Column, DataType, Unique } from "sequelize-typescript";

const { Model } = require("sequelize");
const { Table } = require("sequelize-typescript");

@Table({ tableName: "users" })
class User extends Model<User> {

    @Unique
    @Column({ type: DataType.STRING(50) })
    declare username: string;

    @Column({ type: DataType.STRING(200) })
    declare password: string;

    @Column({ type: DataType.STRING(100) })
    declare email: string;

}

export default User;