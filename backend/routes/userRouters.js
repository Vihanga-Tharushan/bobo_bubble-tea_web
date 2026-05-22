import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const userRouters = express.Router();

userRouters.post("/",createUser);
userRouters.post("/login", loginUser);
export default userRouters;