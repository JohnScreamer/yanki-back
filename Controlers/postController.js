import Post from "../models/post.js";
import { validationResult } from "express-validator/src/validation-result.js";
const MAX_ITEM_RESPONSE = 100;
class PostController {
    async getAllPost(req, res) {
        console.log(req.query);
        const { limit, sortBy, order, page, title } = req.query;
        const queryObj = { ...req.query };
        const excludedFields = ["page", "sort", "limit", "sort", "order"];
        const currentPage = (page - 1) * limit;
        const maxLimit = +limit > MAX_ITEM_RESPONSE ? MAX_ITEM_RESPONSE : limit;
        excludedFields.forEach((el) => delete queryObj[el]);
        // const findPosts = await Post.find(queryObj)
        //     .sort({ [sortBy]: +order })
        //     .limit(maxLimit)
        //     .skip(currentPage)
        //     .populate("user");
        // //////////////////////////////////////////

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|ite|it)\b/g,
            (match) => `$${match}`
        );
        console.log(queryStr);
        // queryStr = JSON.parse(queryStr);
        // console.log(JSON.parse(queryStr));
        // const findPosts = queryStr;
        const totalLength = await Post.find().count(true);
        res.json({ status: "ok", totalLength });
    }
    async getPost(req, res) {
        const { id } = req.params;

        const findPost = await Post.findOne({ _id: id }).populate("user");
        if (!findPost) {
            return res.status(404).json({ message: "Not found post" });
        }
        res.json(findPost);
    }
    async update(req, res) {
        const { id } = req.params;
        const { title, text } = req.body;
        const findPost = await Post.findOneAndUpdate(
            { _id: id },
            { title, text }
        );
        if (!findPost) {
            return res.status(404).json({ message: "Not found post" });
        }
        res.json({ status: "ok", message: "Post has been update" });
    }
    async create(req, res) {
        try {
            const error = validationResult(req);
            console.log(error);
            if (!error.isEmpty()) {
                return res.status(400).json({ message: "error" });
            }

            const { text, title, user, price } = req.body;
            const newPost = new Post({
                text,
                title,
                user,
                price,
            });
            const post = await newPost.save();
            res.status(201).json({
                status: "ok",
                message: "Post created",
                post,
            });
        } catch (error) {
            return res.status(400).json({ message: "error" });
        }
    }
    async delete(req, res) {
        try {
            const { id: title } = req.params;
            const findPost = await Post.findOneAndDelete({ title });
            if (!findPost) {
                return res.status(404).json({ message: "Not found post" });
            }
            res.json({ status: "ok", message: "Post has been deleted" });
        } catch (error) {
            return res.status(404).json({ message: "Not found post" });
        }
    }
}

export default new PostController();
