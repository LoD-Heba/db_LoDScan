// src/models/Favorite.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User.model';
import Novel from './Novel.model';

@Table({
  tableName: 'favorites',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
class Favorite extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare novel_id: number;

  @BelongsTo(() => Novel)
  declare novel: Novel;
}

export default Favorite;