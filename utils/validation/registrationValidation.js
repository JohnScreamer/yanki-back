import { body } from "express-validator";

export const registrationValidation = [
    body("username", "In correct username").isLength({ min: 5 }),

    body("password"),
    body("email").isEmail(),
    body("age").isInt().optional({ nullable: true }),
    body("imgUrl").isURL().optional({ nullable: true }),
];
