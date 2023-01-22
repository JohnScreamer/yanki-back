import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
        try {
            const decoded = jwt.verify(
                token.replace("Bearer", "").replace(" ", ""),
                "ivuk322"
            );
            console.log(decoded);
            req.userId = decoded;
            next();
        } catch (e) {
            res.status(403).json({ message: "Немає доступу", e });
        }
    } else {
        res.status(403).json({ message: "Немає доступу" });
    }
};
