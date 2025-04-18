import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import Novel from "./Novel.model";
import { INovelTypeAttributes } from "../interfaces/novelType.interface";


@Table({ tableName: "novel_type" })
class NovelType extends Model <INovelTypeAttributes> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  declare name: string; // Ej: 'Web Novel', 'Light Novel', 'Fanfic'

  @HasMany(() => Novel)
  declare novels: Novel[];
}

export default NovelType;