import { Router } from "express";
import {
  getAllChapters,
  getChaptersByNovel,
  createChapter,
  updateChapter,
  deleteChapter,
} from "../controllers/chapter.controller";

const chapterRouter = Router();

chapterRouter.get("/", getAllChapters);
chapterRouter.get("/novel/:novelId", getChaptersByNovel);
chapterRouter.post("/", createChapter);
chapterRouter.put("/:id", updateChapter);
chapterRouter.delete("/:id", deleteChapter);

export default chapterRouter;
