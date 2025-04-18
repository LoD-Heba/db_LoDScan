import { Request, Response } from 'express';
import Role from '../models/Role.model';

// Obtener todos los roles
export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({
            message: 'Roles retrieved successfully',
            data: roles,
        });
    } catch (error) {
        console.error('Error getting roles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Obtener un rol por ID
export const getRoleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        
        res.status(200).json({
            message: 'Role retrieved successfully',
            data: role,
        });
    } catch (error) {
        console.error('Error getting role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Crear un nuevo rol
export const createRole = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        
        const role = await Role.create({ name });
        res.status(201).json({
            message: 'Role created successfully',
            data: role,
        });
    } catch (error: any) {
        console.error('Error creating role:', error);
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Role name already exists' });
        }
        
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Actualizar un rol
export const updateRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        
        const role = await Role.findByPk(id);
        
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        
        await role.update({ name });
        res.status(200).json({
            message: 'Role updated successfully',
            data: role,
        });
    } catch (error: any) {
        console.error('Error updating role:', error);
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Role name already exists' });
        }
        
        res.status(500).json({ message: 'Internal server error' });
    }
};

// role.controller.ts
export const deleteRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id, {
            include: ['users'],
        });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        if (role.users && role.users.length > 0) {
            return res.status(403).json({ 
                message: 'Cannot delete role with assigned users' 
            });
        }

        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role' });
    }
};
