import {Column,DataType}from "sequelize-typescript";

const { Model } = require("sequelize");
const { Table } = require("sequelize-typescript");

@Table({ tableName: "rolAutor"})
class RoleAutor extends Model<RoleAutor> {

    @Column({ type: DataType.STRING(20) })
    declare name: string;

    @Column({ type: DataType.STRING(200) })
    declare description: string;

    // @HasMany(() => Autor)
    // declare autors: Autor[];

}
export default RoleAutor;