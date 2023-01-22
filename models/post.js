import mongoose from "mongoose";

const Post = new mongoose.Schema(
    {
        title: { type: String, unique: true, required: true },
        text: { type: String, required: true },
        price: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // comments: [{ type: String, ref: "Comment" }],

        // role: [{ type: String, ref: "Role" }],
    },
    { timestamps: true }
);

export default mongoose.model("Post", Post);
