import { Request, Response } from 'express';
import User from '../models/User.model';
import { checkPassword } from '../utils';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({where: { email }});
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await checkPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Usuario logueado", user });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}