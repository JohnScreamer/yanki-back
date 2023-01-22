import { body } from "express-validator";

export const orderValidation = [
    body("user").isLength({ min: 5, max: 25 }),
    body("goods", "goods error").isArray(),
    body("firstName").isLength({ min: 2, max: 20 }),
    body("lastName").isLength({ min: 2, max: 20 }),
    body("city").isLength({ min: 3, max: 20 }),
    body("phone").isMobilePhone(),
    body("postAddresses").isLength({ min: 1, max: 20 }),
    body("email").isEmail(),
];
