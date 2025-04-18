import { Request, Response } from "express";
import NovelType from "../models/NovelType.model";

// Obtener todos los tipos
export const getAllNovelTypes = async (_: Request, res: Response) => {
  try {
    const types = await NovelType.findAll();
    res.status(200).json({ message: "Tipos de novela obtenidos", data: types });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tipos" });
  }
};

// Obtener un tipo por ID
export const getNovelTypeById = async (req: Request, res: Response) => {
  try {
    const type = await NovelType.findByPk(req.params.id);
    if (!type) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.status(200).json({ message: "Tipo de novela encontrado", data: type });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tipo" });
  }
};

// Crear un tipo
export const createNovelType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El campo 'name' es obligatorio" });
    }

    const newType = await NovelType.create({ name });
    res.status(201).json({ message: "Tipo creado correctamente", data: newType });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Ese tipo ya existe" });
    }
    res.status(500).json({ message: "Error al crear el tipo" });
  }
};

// Actualizar un tipo
export const updateNovelType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const type = await NovelType.findByPk(req.params.id);

    if (!type) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    if (!name) {
      return res.status(400).json({ message: "El campo 'name' es obligatorio" });
    }

    await type.update({ name });
    res.status(200).json({ message: "Tipo actualizado", data: type });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el tipo" });
  }
};

// Eliminar un tipo
export const deleteNovelType = async (req: Request, res: Response) => {
  try {
    const type = await NovelType.findByPk(req.params.id);

    if (!type) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    await type.destroy();
    res.status(200).json({ message: "Tipo eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tipo" });
  }
};
