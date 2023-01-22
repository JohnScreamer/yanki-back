import express from "express";
import favoritController from "../Controlers/favoritController.js";
import checkAuth from "../utils/checkAuth.js";
import checkValidation from "../utils/checkValidation.js";
const router = new express();

router.get("/:id", favoritController.getFavorite);
router.patch("/", favoritController.addToFavorite);
router.delete("/", favoritController.removeFavorite);
router.post("/", favoritController.createFavorite);

export default router;
