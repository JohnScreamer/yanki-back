import mongoose from "mongoose";

const Rating = new mongoose.Schema(
    {
        rating: { type: Number, default: 0 },
        goodsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Rating", Rating);
