import Comment from "../models/comment.js";
import mongoose from "mongoose";
class CommentController {
    async create(req, res) {
        try {
            const { text, user, rating, goodsId } = req.body;
            const comment = new Comment({
                rating,
                text,
                goodsId,
                user,
            });

            const newComment = await comment.save();
            if (!newComment) {
                return res.status(400).json({ message: "error", data: null });
            }
            res.status(201).json({ status: "created", data: newComment });
        } catch (error) {
            res.status(400).json({ message: "error", data: null });
        }
    }
    async update(req, res) {
        try {
            const { text, rating, id } = req.body;
            const comment = await Comment.findOneAndUpdate(
                { _id: id },
                {
                    text,
                    rating,
                }
            );
            if (!comment) {
                return res
                    .status(400)
                    .json({ message: "cant find comment", data: null });
            }

            const newComment = await comment.save();

            res.status(201).json({ status: "update", data: newComment });
        } catch (error) {
            res.status(400).json({ message: "error", data: null });
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            const comment = await Comment.findOne({ _id: id });
            // const hasPermission = comment.user.equals(req.userId);
            // if (!hasPermission) {
            //     return res
            //         .status(400)
            //         .json({ message: "don't have permission" });
            // }

            if (!comment) {
                return res.status(400).json({ message: "cant delete data" });
            }
            await comment.delete();
            return res.json({ message: `${id} deleted`, status: "delete" });
        } catch (error) {
            return res.status(400).json({ message: "cant delete data" });
        }
    }
    async getAll(req, res) {
        try {
            const id = req.params.id;
            const comments = await Comment.find({ goodsId: id }).populate(
                "user"
            );

            return res.json({ status: "ok", data: comments });
        } catch (error) {
            res.status(400).json({ message: "cant get data", data: null });
        }
    }
    async getRating(req, res) {
        try {
            const id = req.params.id;
            const rating = await Comment.aggregate([
                { $match: { goodsId: mongoose.Types.ObjectId(id) } },
                {
                    $group: {
                        _id: "total",
                        avgRating: { $avg: "$rating" },
                        totalVote: { $sum: 1 },
                    },
                },
            ]);
            console.log(rating);
            if (!rating.length) {
                return res.status(200).json({
                    message: "no rating",
                    rating: null,
                    status: "bad",
                });
            }
            res.json({ rating, status: "ok" });
        } catch (error) {
            res.status(400).json({ message: "error, cant get ratings" });
        }
    }
}

export default new CommentController();
