import { Router } from "express";
import roleRouter from "./role.routes";
import userRouter from "./user.routes";
import authRouter from "../auth/auth.routes";

const router = Router();

// Rutas
router.use("/roles", roleRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
