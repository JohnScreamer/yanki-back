import express from "express";
import authController from "../Controlers/authController.js";
import checkAuth from "../utils/checkAuth.js";
import checkValidation from "../utils/checkValidation.js";
import { loginValidation } from "../utils/validation/loginValidation.js";
import { registrationValidation } from "../utils/validation/registrationValidation.js";
const router = new express();

router.post(
    "/registration",
    registrationValidation,
    checkValidation,
    authController.registration
);
router.post("/login", loginValidation, checkValidation, authController.login);
router.post("/", checkAuth, authController.authMe);
router.patch("/", authController.editUserProfile);

export default router;
