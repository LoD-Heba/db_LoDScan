// src/models/Rating.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User.model';
import Novel from './Novel.model';

@Table({
  tableName: 'ratings',
  timestamps: false
})
class Rating extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Novel)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare novel_id: number;

  @BelongsTo(() => Novel)
  declare novel: Novel;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  })
  declare rating: number;
}

export default Rating;