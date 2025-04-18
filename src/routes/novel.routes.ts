import { Router } from "express";
import {
  getAllNovels,
  getNovelById,
  createNovel,
  updateNovel,
  deleteNovel,
} from "../controllers/novel.controller";

const router = Router();

router.get("/", getAllNovels);
router.get("/:id", getNovelById);
router.post("/", createNovel);
router.put("/:id", updateNovel);
router.delete("/:id", deleteNovel);

export default router;
