// src/models/NovelType.model.ts
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import Novel from './Novel.model';

@Table({
  tableName: 'novel_types',
  timestamps: false
})
class NovelType extends Model {
  // ID único del tipo
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  // Nombre del tipo (debe ser único)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  })
  declare type_name: string;

  // Novelas que pertenecen a este tipo
  @HasMany(() => Novel)
  declare novels: Novel[];
}

export default NovelType;