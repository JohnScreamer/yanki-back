import Order from "../models/order.js";
import Game from "../models/game.js";
class GameController {
    async getGames(req, res) {
        const {
            limit = 9,
            page = 1,
            order = "-1",
            sort = "name",
            name,
            platform,
            ...queryObj
        } = req.query;
        console.log(req.query);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|ite|it|lte|lt)\b/g,
            (match) => `$${match}`
        );
        const param = JSON.parse(queryStr);
        if (name) {
            param.name = { $regex: name, $options: "i" };
        }
        if (platform) {
            param.platform = { $regex: platform, $options: "i" };
        }
        const games = await Game.find(param)
            .collation({ locale: `en`, strength: 1 })
            .limit(limit)
            .skip((+page - 1) * 9)
            .sort({ [`${sort}`]: order });

        const amount = await Game.find(param)
            .collation({ locale: `en`, strength: 1 })
            .count(true);
        res.json({ status: "ok", amount, games });
    }
    async getOneGame(req, res) {
        let game;
        try {
            console.log(req.query);
            const id = req.params.id;
            game = await Game.findById(id);
            if (!game) {
                return res.status(400).json({
                    status: "bad",
                    message: error ? error : "Error",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: "bad",
                message: error ? error : "Error",
            });
        }

        res.status(200).json({
            status: "ok",
            game,
        });
    }

    async order(req, res) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json({ message: "error" });
        }

        const { user, isDelivered, goods } = req.body;

        const order = new Order({
            user,
            isDelivered,
            goods,
        });
        const newData = await order.save();

        res.status(201).json({
            status: "ok",
            message: "Order created",
            newData,
        });
    }
}

export default new GameController();
// let res = await coll.distinct('age');
