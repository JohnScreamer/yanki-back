import Post from "../models/post.js";
import { validationResult } from "express-validator/src/validation-result.js";
import favorite from "../models/favorite.js";
class FavoriteController {
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
    async getFavorite(req, res) {
        const { id } = req.params;

        try {
            const data = await favorite.findOne({ user: id }).populate("goods");
            res.json({ status: "ok", data });
        } catch (error) {
            res.status(404).json({
                error,
                status: null,
            });
        }
    }
    async addToFavorite(req, res) {
        const { userId, goodsId } = req.body;
        console.log(req.headers.authorization, "hre");
        const userFavorite = await favorite.findOne({ user: userId });
        if (userFavorite) {
            await userFavorite.update({
                $push: {
                    goods: goodsId,
                },
            });
            const data = await favorite
                .findOne({ user: userId })
                .populate("goods");
            // const data = await updateUserFav.populate("goods");
            // console.log(data);
            return res.json({
                status: "ok",
                data,
            });
        }

        res.status(404).json({
            error: "err",
        });
    }
    async createFavorite(req, res) {
        const { userId, goodsId } = req.body;
        const newUserFav = await favorite.create({
            user: userId,
            goods: [goodsId],
        });
        const data = await newUserFav.populate("goods");
        if (newUserFav) {
            return res.status(201).json({ status: "ok", data });
        }
        res.status(404).json({
            error: "err",
        });
    }
    async removeFavorite(req, res) {
        const { userId, goodsId } = req.body;

        // const filtered = await favorite
        //     .findOne({ user: userId })
        //     .populate("goods");
        // console.log(filtered);
        await favorite.update({ user: userId }, { $pull: { goods: goodsId } });

        const data = await favorite.findOne({ user: userId }).populate("goods");
        if (data) {
            return res.status(201).json({ status: "ok", data });
        }
        res.status(404).json({
            error: "err",
        });
    }
}

export default new FavoriteController();
