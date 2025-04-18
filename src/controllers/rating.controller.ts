import { Request, Response } from 'express';
import Rating from '../models/Rating.model';


// Obtener todos los ratings
export const getAllRatings = async (_: Request, res: Response) => {
    try {
        const ratings = await Rating.findAll();
        res.status(200).json({ message: 'Ratings obtenidos correctamente', data: ratings });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ratings' });
    }
};

// Obtener rating por ID
export const getRatingById = async (req: Request, res: Response) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) return res.status(404).json({ message: 'Rating no encontrado' });

        res.status(200).json({ message: 'Rating obtenido', data: rating });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el rating' });
    }
};

// Crear nuevo rating
export const createRating = async (req: Request, res: Response) => {
    try {
        const { value, userId, novelId } = req.body;

        if (!value || !userId || !novelId) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        const rating = await Rating.create({ value, userId, novelId });
        res.status(201).json({ message: 'Rating creado', data: rating });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el rating' });
    }
};

// Actualizar un rating
export const updateRating = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        const rating = await Rating.findByPk(id);
        if (!rating) return res.status(404).json({ message: 'Rating no encontrado' });

        if (value < 1 || value > 5) {
            return res.status(400).json({ message: 'El valor debe estar entre 1 y 5' });
        }

        await rating.update({ value });
        res.status(200).json({ message: 'Rating actualizado', data: rating });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el rating' });
    }
};

// Eliminar un rating
export const deleteRating = async (req: Request, res: Response) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) return res.status(404).json({ message: 'Rating no encontrado' });

        await rating.destroy();
        res.status(200).json({ message: 'Rating eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el rating' });
    }
};
