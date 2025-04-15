import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import Novel from "./Novel.model";

@Table({ tableName: "novel_type" })
class NovelType extends Model <NovelType> {
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