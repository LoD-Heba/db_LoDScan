import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User.model";
import Chapter from "./Chapter.model";
import { ITypoReportAttributes } from "../interfaces/typoReport.interface";

@Table({ tableName: "typo_report" })
class TypoReport extends Model<ITypoReportAttributes> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: "Texto del error o problema encontrado",
  })
  declare reportText: string;

  @Column({
    type: DataType.ENUM("pendiente", "revisado", "rechazado"),
    defaultValue: "pendiente",
    allowNull: false,
  })
  declare status: "pendiente" | "revisado" | "rechazado";

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare chapterId: number;

  @BelongsTo(() => Chapter)
  declare chapter: Chapter;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default TypoReport;
