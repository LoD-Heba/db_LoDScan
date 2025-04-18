import { Request, Response } from "express";
import Chapter from "../models/Chapter.model";

// Obtener todos los capítulos
export const getAllChapters = async (_req: Request, res: Response) => {
  try {
    const chapters = await Chapter.findAll();
    res.status(200).json({ message: "Capítulos obtenidos correctamente", data: chapters });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener capítulos" });
  }
};

// Obtener capítulos por novela
export const getChaptersByNovel = async (req: Request, res: Response) => {
  try {
    const { novelId } = req.params;
    const chapters = await Chapter.findAll({ where: { novelId } });
    res.status(200).json({ message: "Capítulos de la novela", data: chapters });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener capítulos por novela" });
  }
};

// Crear un capítulo
export const createChapter = async (req: Request, res: Response) => {
  try {
    const { title, content, chapterNumber, novelId } = req.body;

    if (!title || !content || !chapterNumber || !novelId) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const newChapter = await Chapter.create({ title, content, chapterNumber, novelId });
    res.status(201).json({ message: "Capítulo creado", data: newChapter });
  } catch (error) {
    res.status(500).json({ message: "Error al crear capítulo" });
  }
};

// Actualizar capítulo
export const updateChapter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, chapterNumber } = req.body;

    const chapter = await Chapter.findByPk(id);
    if (!chapter) return res.status(404).json({ message: "Capítulo no encontrado" });

    await chapter.update({ title, content, chapterNumber });
    res.status(200).json({ message: "Capítulo actualizado", data: chapter });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar capítulo" });
  }
};

// Eliminar capítulo
export const deleteChapter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findByPk(id);
    if (!chapter) return res.status(404).json({ message: "Capítulo no encontrado" });

    await chapter.destroy();
    res.status(200).json({ message: "Capítulo eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar capítulo" });
  }
};
