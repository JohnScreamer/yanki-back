import { validationResult } from "express-validator";

export default (req, res, next) => {
    const error = validationResult(req);
    console.log(error);
    if (!error.isEmpty()) {
        return res.json({ message: error });
    }
    next();
};
