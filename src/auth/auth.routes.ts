import { Router } from "express";
import { login } from "../auth/auth.controller"; // Usa solo un controlador

const authRouter = Router();

authRouter.post("/login", login);

export default authRouter;