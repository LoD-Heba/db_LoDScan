import { Router } from "express";
import {
  getAllComments,
  getCommentsByChapter,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";

const commentRouter = Router();

commentRouter.get("/", getAllComments);
commentRouter.get("/chapter/:chapterId", getCommentsByChapter);
commentRouter.post("/", createComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
