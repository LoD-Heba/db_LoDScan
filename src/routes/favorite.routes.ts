import { Router } from "express";
import {
  getAllFavorites,
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
} from "../controllers/favorite.controller";

const favoriteRouter = Router();

favoriteRouter.get("/", getAllFavorites);
favoriteRouter.get("/user/:userId", getFavoritesByUser);
favoriteRouter.post("/", addFavorite);
favoriteRouter.delete("/:userId/:novelId", removeFavorite);

export default favoriteRouter;
