import express, { json } from "express";
import mongoose from "mongoose";
import multer from "multer";
import authRouter from "./Routhes/authRouths.js";
import postRouter from "./Routhes/postRouths.js";
import orderRouter from "./Routhes/orderRouth.js";
import favoriteRouth from "./Routhes/favoriteRouth.js";
import gameRouter from "./Routhes/gameRouth.js";
import commentRouter from "./Routhes/commentRouth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 4000;
const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
app.use(
    cors({
        origin: "https://yanki-front2-johnscreamer.vercel.app",
        credentials: true,
        optionSuccessStatus: 200,
    })
);
app.use(json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/favorite", favoriteRouth);
app.use("/order", orderRouter);
app.use("/comment", commentRouter);
app.use("/game", gameRouter);
app.post("/upload", upload.single("image"), (req, res) => {
    res.json({
        uploads: `/uploads/${req.file?.originalname}`,
    });
});
app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, async (e) => {
    await mongoose
        .connect(
            "mongodb+srv://ivuk:ivuk@cluster0.2ctyuog.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(() => console.log("good"))
        .catch(() => console.log("error"));
});
