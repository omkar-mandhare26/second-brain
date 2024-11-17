import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwt_secret_key = process.env.jwt_key || "my_secret_key";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ message: "Not signed in" });
            return;
        }

        const decoded = jwt.verify(token, jwt_secret_key);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
