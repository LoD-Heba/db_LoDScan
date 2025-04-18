import { Request, Response } from "express";
import Genre from "../models/Genre.model";

// Obtener todos los géneros
export const getAllGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json({ message: "Géneros obtenidos correctamente", data: genres });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los géneros" });
  }
};

// Obtener un género por ID
export const getGenreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    res.status(200).json({ message: "Género encontrado", data: genre });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el género" });
  }
};

// Crear un nuevo género
export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const genre = await Genre.create({ name });
    res.status(201).json({ message: "Género creado", data: genre });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "El género ya existe" });
    }
    res.status(500).json({ message: "Error al crear el género" });
  }
};

// Actualizar un género
export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    await genre.update({ name });
    res.status(200).json({ message: "Género actualizado", data: genre });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Ya existe un género con ese nombre" });
    }
    res.status(500).json({ message: "Error al actualizar el género" });
  }
};

// Eliminar un género
export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    await genre.destroy();
    res.status(200).json({ message: "Género eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el género" });
  }
};
