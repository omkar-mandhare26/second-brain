import { link } from "fs";
import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const contentTypes = ["image", "video", "article", "audio"];
const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    userId: { type: Types.ObjectId, ref: "User", required: true }
});

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true }
});

const tagSchema = new Schema({
    title: { type: String, unique: true }
});

const User = model("User", userSchema);
const Content = model("Content", contentSchema);
const Link = model("Link", linkSchema);
const Tag = model("Tag", tagSchema);

export { User, Content, Link, Tag };
