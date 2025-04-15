import { Request, Response } from "express";
import User from "../models/User.model";
import { hashPassword } from "../utils";

export const createUser = async (req: Request, res: Response) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    res.status(201).json({
      message: "Usuario creado correctamente",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};