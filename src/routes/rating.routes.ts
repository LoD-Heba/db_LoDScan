import { Router } from 'express';
import {
    getAllRatings,
    getRatingById,
    createRating,
    updateRating,
    deleteRating
} from '../controllers/rating.controller';

const router = Router();

router.get('/', getAllRatings);
router.get('/:id', getRatingById);
router.post('/', createRating);
router.put('/:id', updateRating);
router.delete('/:id', deleteRating);

export default router;
