// src/models/Role.model.ts
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import User from './User.model';

@Table({
  tableName: 'roles',
  timestamps: false // No necesitamos timestamps aquí
})
class Role extends Model {
  // ID único del rol
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  // Nombre del rol (debe ser único)
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isIn: [['admin', 'moderador', 'nuevo', 'autor_principiante', 'autor_promedio', 'autor_profesional']]
    }
  })
  declare name: string;

  // Descripción del rol y sus permisos
  @Column({
    type: DataType.STRING(200),
    allowNull: true
  })
  declare description: string;

  // Usuarios que tienen este rol
  @HasMany(() => User)
  declare users: User[];
}

export default Role;