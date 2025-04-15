import { Router } from "express";
import { createRole } from "../controllers/role.controller";
import { createUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", createUser);

export default userRouter;