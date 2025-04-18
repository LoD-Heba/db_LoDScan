import { Router } from "express";
import roleRouter from "./role.routes";
import userRouter from "./user.routes";
import authRouter from "../auth/auth.routes";
import ratingRouter from "./rating.routes";
import novelRouter from "./novel.routes";
import novelTypeRouter from "./novelType.routes";
import novelGenreRouter from "./novelGenre.routes";
import genreRoutes from "./genre.routes"
import favoriteRouter from "./favorite.routes";
import chapterRouter from "./chapter.routes";
import commentRouter from "./comment.routes";
import typoReportRouter from "./typoReport.routes";

const router = Router();

// Rutas
router.use("/roles", roleRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use('/ratings', ratingRouter);
router.use("/novels", novelRouter);
router.use("/novel-types", novelTypeRouter);
router.use("/novel-genres", novelGenreRouter);
router.use("/genres", genreRoutes);
router.use("/favorites", favoriteRouter);
router.use("/chapters", chapterRouter);
router.use("/comments", commentRouter);
router.use("/typo-reports", typoReportRouter);

export default router;
