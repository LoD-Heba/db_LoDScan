import { Request, Response } from "express";
import TypoReport from "../models/TypoReport.model";

// Crear reporte
export const createTypoReport = async (req: Request, res: Response) => {
  try {
    const { reportText, chapterId, userId } = req.body;

    if (!reportText || !chapterId) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const report = await TypoReport.create({
      reportText,
      chapterId,
      userId: userId || null,
    });

    res.status(201).json({ message: "Reporte enviado", data: report });
  } catch (error) {
    res.status(500).json({ message: "Error al crear reporte" });
  }
};

// Obtener todos los reportes (solo para admins)
export const getAllTypoReports = async (_req: Request, res: Response) => {
  try {
    const reports = await TypoReport.findAll();
    res.status(200).json({ data: reports });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reportes" });
  }
};

// Obtener reportes de un usuario específico
export const getUserReports = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const reports = await TypoReport.findAll({ where: { userId } });
    res.status(200).json({ data: reports });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reportes del usuario" });
  }
};

// Cambiar estado del reporte (solo admins)
export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pendiente", "revisado", "rechazado"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const report = await TypoReport.findByPk(id);
    if (!report) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    report.status = status as any;
    await report.save();

    res.status(200).json({ message: "Estado actualizado", data: report });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar estado" });
  }
};
