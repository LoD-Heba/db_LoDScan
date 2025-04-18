import { Router } from "express";
import {
  createTypoReport,
  getAllTypoReports,
  getUserReports,
  updateReportStatus,
} from "../controllers/typoReport.controller";

const typoReportRouter = Router();

typoReportRouter.post("/", createTypoReport);
typoReportRouter.get("/", getAllTypoReports); // Solo admin
typoReportRouter.get("/user/:userId", getUserReports);
typoReportRouter.put("/:id/status", updateReportStatus); // Solo admin/mod

export default typoReportRouter;
