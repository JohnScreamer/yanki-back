import { body } from "express-validator";

export const commentValidation = [
    body("text", "не правильний текс").isLength({ min: 2, max: 300 }),
    body("rating").isInt({ max: 5, min: 1 }),
];
