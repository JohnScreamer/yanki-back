import mongoose from "mongoose";

const Order = new mongoose.Schema(
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
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postAddresses: {
            type: String,
            required: true,
        },

        isDelivered: {
            type: Boolean,
            default: false,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", Order);
