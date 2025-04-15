import { Router } from "express";
import { createRole } from "../controllers/role.controller";

const roleRouter = Router();

roleRouter.post("/", createRole);

export default roleRouter;