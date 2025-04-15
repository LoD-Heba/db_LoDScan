import { Request, Response } from 'express';
import Role from '../models/Role.model';

export const createRole = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const role = await Role.create(req.body)
        res.status(201).json({
            message: 'Role created successfully',
            data: role,
        })
    } catch (error) {
        console.error('Error al crear un rol:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
