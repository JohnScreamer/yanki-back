import express from "express";
import GameController from "./../Controlers/gameController.js";
const router = new express();

router.get("/:id", GameController.getOneGame);
router.get("/", GameController.getGames);
// router.post("/rating", GameController.ratingCreate);
// router.patch("/rating/:id", GameController.ratingUpdate);

export default router;
