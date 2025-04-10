// src/models/User.model.ts
import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Role from './Role.model';
import Novel from './Novel.model';
import Comment from './Comment.model';
import Favorite from './Favorite.model';
import Rating from './Rating.model';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at', // Usamos created_at en lugar de createdAt
  updatedAt: false         // No necesitamos updatedAt en este modelo
})
class User extends Model {
  // Identificador único autoincremental
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  // Nombre real o pseudónimo del usuario
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  })
  declare name: string;

  // Email único para login y comunicación
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  })
  declare email: string;

  // Contraseña hasheada (se hashea antes de guardar)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 255] // Mínimo 8 caracteres
    }
  })
  declare password: string;

  // Relación con el rol del usuario (autor, admin, etc.)
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 3 // Valor por defecto: 'nuevo'
  })
  declare role_id: number;

  // Instancia del rol asociado (para eager loading)
  @BelongsTo(() => Role)
  declare role: Role;

  // Avatar del usuario (URL a la imagen)
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true // Validamos que sea una URL válida
    }
  })
  declare avatar: string;

  // Relaciones con otros modelos:
  
  // Novelas subidas por este usuario
  @HasMany(() => Novel, 'uploader_id')
  declare uploaded_novels: Novel[];

  // Comentarios realizados por el usuario
  @HasMany(() => Comment)
  declare comments: Comment[];

  // Novelas favoritas del usuario
  @HasMany(() => Favorite)
  declare favorites: Favorite[];

  // Ratings dados por el usuario
  @HasMany(() => Rating)
  declare ratings: Rating[];
}

export default User;