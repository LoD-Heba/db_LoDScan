import { Router } from "express";
import {
  getAllNovelGenres,
  createNovelGenre,
  deleteNovelGenre,
} from "../controllers/novelGenre.controller";

const router = Router();

router.get("/", getAllNovelGenres);
router.post("/", createNovelGenre);
router.delete("/:id", deleteNovelGenre);

export default router;
