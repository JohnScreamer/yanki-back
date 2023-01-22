import mongoose from "mongoose";

const Favorite = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        goods: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Game",
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Favorite", Favorite);
