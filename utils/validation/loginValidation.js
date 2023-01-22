import { body } from "express-validator";

export const registrationValidation = [
    body("username", "In correct username").isLength({ min: 5, max: 15 }),
    body("email").isEmail().optional({ nullable: true }),
    body("age").isInt().optional({ nullable: true }),
    body("imgUrl").isURL().optional({ nullable: true }),
];
export const loginValidation = [body("email"), body("password")];
