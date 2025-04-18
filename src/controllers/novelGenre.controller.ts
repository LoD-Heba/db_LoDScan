import { Request, Response } from "express";
import NovelGenre from "../models/NovelGenre.model";

export const getAllNovelGenres = async (_req: Request, res: Response) => {
  try {
    const data = await NovelGenre.findAll();
    res.status(200).json({ message: "Relaciones encontradas", data });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las relaciones" });
  }
};

export const createNovelGenre = async (req: Request, res: Response) => {
  try {
    const { novelId, genreId } = req.body;
    if (!novelId || !genreId) {
      return res.status(400).json({ message: "novelId y genreId son obligatorios" });
    }

    const relation = await NovelGenre.create({ novelId, genreId });
    res.status(201).json({ message: "Relación creada", data: relation });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la relación" });
  }
};

export const deleteNovelGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const relation = await NovelGenre.findByPk(id);

    if (!relation) {
      return res.status(404).json({ message: "Relación no encontrada" });
    }

    await relation.destroy();
    res.status(200).json({ message: "Relación eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la relación" });
  }
};
