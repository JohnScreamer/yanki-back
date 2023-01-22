import mongoose from "mongoose";

const Game = new mongoose.Schema(
    {
        price: Number,
        imgUrl: String,
        name: String,
        platform: String,
        localizetion: String,
        discType: String,
        genre: String,
        box: String,
        developer: String,
        pg: Number,
        publisher: String,
        features: String,
        developCountry: String,
        brendFrom: String,
        release: String,
        releaseUkr: String,
        systemRequirements: String,
        playersNum: String,
        Guarantee: String,
        servicActiv: String,
        minRequireSis: String,
        distributorInUkraine: String,
    },
    { timestamps: true }
);

export default mongoose.model("Game", Game);
