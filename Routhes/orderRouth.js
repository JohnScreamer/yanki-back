import express from "express";
import orderController from "../Controlers/orderController.js";
import checkValidation from "../utils/checkValidation.js";
import { orderValidation } from "../utils/validation/orderValidation.js";
const router = new express();

router.post("/", orderValidation, checkValidation, orderController.order);
router.get("/:id", orderController.getAllUserOrder);
// router.post("/rating", GameController.ratingCreate);
// router.patch("/rating/:id", GameController.ratingUpdate);

export default router;
