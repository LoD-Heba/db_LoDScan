import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./User.model";
import Chapter from "./Chapter.model";

@Table({ tableName: "commentError" })
class CommentError extends Model <CommentError>{
  
  @Column (DataType.TEXT)
  declare content: string;
  
}

export default CommentError;