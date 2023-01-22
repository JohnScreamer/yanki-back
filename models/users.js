import mongoose from "mongoose";

const User = new mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        imgUrl: { type: String },
        role: [{ type: String, ref: "Role" }],
        age: Number,
        firstName: String,
        lastName: String,
        city: String,
        description: String,
        postNumber: String,
        phone: String,
        // posts: [Post],
    },
    { timestamps: true }
);

export default mongoose.model("User", User);
