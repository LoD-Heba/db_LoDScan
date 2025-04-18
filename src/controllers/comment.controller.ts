import { Request, Response } from "express";
import Comment from "../models/Comment.model";

// Obtener todos los comentarios
export const getAllComments = async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json({ message: "Comentarios obtenidos", data: comments });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

// Obtener comentarios por capítulo
export const getCommentsByChapter = async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const comments = await Comment.findAll({ where: { chapterId } });
    res.status(200).json({ message: "Comentarios del capítulo", data: comments });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

// Crear comentario
export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, userId, chapterId } = req.body;
    if (!content || !userId || !chapterId) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const newComment = await Comment.create({ content, userId, chapterId });
    res.status(201).json({ message: "Comentario creado", data: newComment });
  } catch (error) {
    res.status(500).json({ message: "Error al crear comentario" });
  }
};

// Actualizar comentario
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

    await comment.update({ content });
    res.status(200).json({ message: "Comentario actualizado", data: comment });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar comentario" });
  }
};

// Eliminar comentario
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

    await comment.destroy();
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar comentario" });
  }
};
