import mongoose from "mongoose";

const Comment = new mongoose.Schema(
    {
        text: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        goodsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true,
        },

        // role: [{ type: String, ref: "Role" }],
    },
    { timestamps: true }
);

export default mongoose.model("Comment", Comment);
