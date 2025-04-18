import { Request, Response } from "express";
import Favorite from "../models/Favorite.model";

// Obtener todos los favoritos
export const getAllFavorites = async (_req: Request, res: Response) => {
  try {
    const favorites = await Favorite.findAll();
    res.status(200).json({ message: "Favoritos obtenidos correctamente", data: favorites });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener favoritos" });
  }
};

// Obtener favoritos por usuario
export const getFavoritesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.findAll({ where: { userId } });
    res.status(200).json({ message: "Favoritos del usuario", data: favorites });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener favoritos del usuario" });
  }
};

// Agregar a favoritos
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, novelId } = req.body;

    if (!userId || !novelId) {
      return res.status(400).json({ message: "userId y novelId son obligatorios" });
    }

    const favorite = await Favorite.create({ userId, novelId });
    res.status(201).json({ message: "Agregado a favoritos", data: favorite });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar favorito" });
  }
};

// Eliminar un favorito
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, novelId } = req.params;

    const favorite = await Favorite.findOne({ where: { userId, novelId } });

    if (!favorite) {
      return res.status(404).json({ message: "Favorito no encontrado" });
    }

    await favorite.destroy();
    res.status(200).json({ message: "Favorito eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar favorito" });
  }
};
