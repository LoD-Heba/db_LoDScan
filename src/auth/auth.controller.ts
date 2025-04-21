import { Request, Response } from 'express';
import User from '../models/User.model';
import Role from '../models/Role.model';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ 
            where: { email },
            include: [Role]
        });

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        res.status(200).json({
            message: "Login exitoso",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role?.name  // Cambiado a mayúscula
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: "Error del servidor" });
    }
}