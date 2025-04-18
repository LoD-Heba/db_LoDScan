import { Request, Response } from "express";
import Novel from "../models/Novel.model";
import User from "../models/User.model";
import NovelType from "../models/NovelType.model";

export const getAllNovels = async (_: Request, res: Response) => {
  try {
    const novels = await Novel.findAll({
      include: [User, NovelType],
    });
    res.status(200).json({ message: "Novelas obtenidas", data: novels });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener novelas" });
  }
};

export const getNovelById = async (req: Request, res: Response) => {
  try {
    const novel = await Novel.findByPk(req.params.id, {
      include: [User, NovelType],
    });

    if (!novel) {
      return res.status(404).json({ message: "Novela no encontrada" });
    }

    res.status(200).json({ message: "Novela obtenida", data: novel });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la novela" });
  }
};

export const createNovel = async (req: Request, res: Response) => {
  try {
    const { title, description, coverImage, authorId, typeId } = req.body;

    if (!title || !authorId || !typeId) {
      return res
        .status(400)
        .json({ message: "Faltan campos obligatorios: title, authorId, typeId" });
    }

    const novel = await Novel.create({
      title,
      description,
      coverImage,
      authorId,
      typeId,
    });

    res.status(201).json({ message: "Novela creada", data: novel });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la novela" });
  }
};

export const updateNovel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, coverImage, typeId } = req.body;

    const novel = await Novel.findByPk(id);
    if (!novel) {
      return res.status(404).json({ message: "Novela no encontrada" });
    }

    await novel.update({
      title: title || novel.title,
      description: description || novel.description,
      coverImage: coverImage || novel.coverImage,
      typeId: typeId || novel.typeId,
    });

    res.status(200).json({ message: "Novela actualizada", data: novel });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la novela" });
  }
};

export const deleteNovel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findByPk(id);

    if (!novel) {
      return res.status(404).json({ message: "Novela no encontrada" });
    }

    await novel.destroy();
    res.status(200).json({ message: "Novela eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la novela" });
  }
};
