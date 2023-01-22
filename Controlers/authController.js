import Role from "../models/role.js";
import users from "../models/users.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
class AuthController {
    async login(req, res) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(400).json(error.array());
                return;
            }

            const { email, password } = req.body;
            const findUser = await userModel.findOne({ email });
            if (!findUser) {
                return res.status(404).json({ message: "Cant find user" });
            }
            const isPassCorrect = await bcrypt.compare(
                password,
                findUser.password
            );
            if (!isPassCorrect) {
                return res.status(403).json({ message: "error name or pass" });
            }
            const { password: pass, ...response } = findUser._doc;
            const token = jwt.sign(
                {
                    username: response.username,
                },
                "ivuk322"
            );
            // const serialized = serialize("authorization", token);
            res.cookie("auth", token);

            // setHeader("Set-Cookie", serialized, {
            //     sameSite: "none",
            //     httpOnly: true,
            // });

            res.json({
                success: true,
                response,
                token,
            });
        } catch (error) {
            return res
                .status(404)
                .json({ message: "Cant find user end", error });
        }
    }
    async registration(req, res) {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                res.status(400).json(error.array());
                return;
            }
            const { username, password, email } = req.body;
            const salt = await bcrypt.genSalt(10);
            const passHash = await bcrypt.hash(password, salt);
            const doc = new userModel({ username, password: passHash, email });
            const user = await doc.save();
            if (!user) {
                return res.status(400).json({ message: "Cant create user" });
            }
            const { password: pass, ...response } = user._doc;

            const token = jwt.sign(
                {
                    _id: response._id,
                },
                "ivuk322"
            );

            res.status(201).json({
                success: true,
                response,
                token,
            });
        } catch (e) {
            res.status(400).json({ message: "some thing go wrong", e });
        }
    }
    async authMe(req, res) {
        try {
            const username = req.userId.username;
            console.log(username);
            const userData = await userModel.findOne({ username });
            console.log(userData);
            if (!userData) {
                return res.status(400).json({ message: "Cant find user" });
            }
            const { password, ...data } = userData._doc;
            res.json({
                status: "ok",
                data,
            });
        } catch (error) {
            res.status(401).json({
                status: "error, no access",
            });
        }
    }
    async editUserProfile(req, res) {
        try {
            // const error = validationResult(req);
            // if (!error.isEmpty()) {
            //     res.status(400).json(error.array());
            //     return;
            // }
            console.log("test");
            const { email, city, lastName, firstName, postNumber, phone } =
                req.body;
            const findUser = await userModel.findOne({ email });
            console.log(findUser);
            if (!findUser) {
                return res.status(404).json({ message: "Cant find user" });
            }

            const updateProfile = await userModel.findOneAndUpdate(
                { email },
                { email, city, lastName, firstName, postNumber, phone }
            );
            console.log(updateProfile);
            const { password: pass, ...response } = updateProfile._doc;

            res.json({
                success: true,
                response,
            });
        } catch (error) {
            return res
                .status(404)
                .json({ message: "Cant find user end", error });
        }
    }
}

export default new AuthController();
