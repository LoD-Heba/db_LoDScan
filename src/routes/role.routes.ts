import { Router } from "express";
import { 
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} from "../controllers/role.controller";

const roleRouter = Router();

roleRouter.get("/", getAllRoles);       // Obtener todos los roles
roleRouter.get("/:id", getRoleById);    // Obtener un rol por ID
roleRouter.post("/", createRole);       // Crear un nuevo rol
roleRouter.put("/:id", updateRole);     // Actualizar un rol
roleRouter.delete("/:id", deleteRole);  // Eliminar un rol

export default roleRouter;