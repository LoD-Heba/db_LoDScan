import { Request, Response } from 'express';
import User from '../models/User.model';
import Role from '../models/Role.model';
import { hashPassword } from '../utils';
import { login } from '../auth/auth.controller';
// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Traemos todos los usuarios y también sus roles asociados
        const users = await User.findAll({ include: [Role] });
        res.status(200).json({
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { include: [Role] });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            data: user,
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, roleId } = req.body;

        // Validar que todos los campos estén presentes
        if (!username || !email || !password || !roleId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Crear el usuario
        const newUser = await User.create({ username, email, password, roleId });

        res.status(201).json({
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error: any) {
        console.error('Error creating user:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, password, roleId } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Actualizar campos solo si fueron enviados en el body
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.password = password;
        if (roleId !== undefined) user.roleId = roleId;

        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            data: user,
        });
    } catch (error: any) {
        console.error('Error updating user:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
