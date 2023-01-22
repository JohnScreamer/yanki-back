import { body } from "express-validator";

export const postValidation = [
    body("text", "не правильний текс").isLength({ min: 5, max: 115 }),
    body("title", "Не коректний тайтл").isLength({ min: 2, max: 20 }),
];
