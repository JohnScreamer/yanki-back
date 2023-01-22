import express from "express";
import CommentController from "../Controlers/commentController.js";
import checkAuth from "../utils/checkAuth.js";
import checkValidation from "../utils/checkValidation.js";
import { commentValidation } from "../utils/validation/commentValidation.js";
const router = new express();

router.get("/:id", CommentController.getAll);
router.post(
    "/",
    // checkAuth,
    commentValidation,
    checkValidation,
    CommentController.create
);
router.patch(
    "/",
    // checkAuth,
    commentValidation,
    checkValidation,
    CommentController.update
);
router.delete("/:id", CommentController.delete);
router.get("/rating/:id", CommentController.getRating);

export default router;
