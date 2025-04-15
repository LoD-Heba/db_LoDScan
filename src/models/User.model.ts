import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Role from "./Role.model";
import Comment from "./Comment.model";
import Favorite from "./Favorite.model";
import Rating from "./Rating.model";
import {
  IUserAttributes,
  IUserCreationAttributes,
} from "../interfaces/user.interface";

@Table({ tableName: "user" })
class User extends Model<IUserAttributes, IUserCreationAttributes> {
  
  @Column({
    type: DataType.STRING(70),
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare password: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare roleId: number;

  @BelongsTo(() => Role)
  declare role: Role;

  @HasMany(() => Comment)
  declare comments: Comment[];

  @HasMany(() => Favorite)
  declare favorites: Favorite[];

  @HasMany(() => Rating)
  declare ratings: Rating[];
}

export default User;
