import express from "express";
import checkAuth from "../utils/checkAuth.js";
import postController from "../Controlers/postController.js";
import { postValidation } from "../utils/validation/postValidation.js";
const router = new express();

router.get("/", postController.getAllPost);
router.get("/:id", postController.getPost);
router.post("/", checkAuth, postValidation, postController.create);
router.patch("/:id", checkAuth, postValidation, postController.update);
router.delete("/:id", checkAuth, postController.delete);

export default router;
