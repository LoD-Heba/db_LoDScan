import { Router } from "express";

import {
  getAllNovelTypes,
  getNovelTypeById,
  createNovelType,
  updateNovelType,
  deleteNovelType,
} from "../controllers/noveltype.controller";

const router = Router();

router.get("/", getAllNovelTypes);
router.get("/:id", getNovelTypeById);
router.post("/", createNovelType);
router.put("/:id", updateNovelType);
router.delete("/:id", deleteNovelType);

export default router;
