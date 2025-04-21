import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,// Añade esta importación
} from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);// Añade esta ruta
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;