// src/interfaces/role.interface.ts
import { Optional } from 'sequelize';

export interface IRoleAttributes {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface IRoleCreationAttributes extends Optional<IRoleAttributes, 'id'> {}