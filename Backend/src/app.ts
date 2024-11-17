import { User, Content, Link, Tag } from "./database/schemas";
import express, { Request, Response } from "express";
import userSchema from "./zod_schemas/zodSchema";
import connectDB from "./database/connectDB";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
const jwt_secret_key = process.env.JWT_KEY || "my_secret_key";

app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const validation = userSchema.safeParse({ username, password });

        if (!validation.success) {
            res.status(411).json({ message: "Input Error" });
            return;
        }

        const user = await User.findOne({ username });
        if (user) {
            res.status(403).json({ message: "User already exists" });
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const validation = userSchema.safeParse({ username, password });

        if (!validation.success) {
            res.status(411).json({ message: "Input Error" });
            return;
        }

        const user = await User.findOne({ username });
        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            res.status(403).json({ message: "Incorrect Password" });
            return;
        }

        const token = jwt.sign({ id: user._id, username }, jwt_secret_key);

        res.status(200).json({ message: "Signin successful", token });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/api/v1/content", async (req: Request, res: Response) => {});

app.get("/api/v1/content", async (req: Request, res: Response) => {});

app.delete("/api/v1/content", async (req: Request, res: Response) => {});

app.post("/api/v1/brain/share", async (req: Request, res: Response) => {});

app.get("/api/v1/brain/:sharelink", async (req: Request, res: Response) => {});

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server Running on PORT 3000");
    });
});
