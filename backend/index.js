import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Test from "./models/test.js";
import userRouters from "./routes/userRouters.js";
import productRouters from "./routes/productRouters.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config(); // Load environment variables from .env file

const app = express();


//this is middleware to allow cross-origin requests
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

//optional token verification middleware
const verifyToken = (req, res, next) => {
    let token = req.header("Authorization");

    if(token != null){
        //remove "Bearer " from token
        token = token.replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            
            if(err){
                return res.json({
                    message: "Invalid token"
                });
            }
            if(decoded == null){
                return res.json({
                    message: "Invalid token"
                });
            }
            req.user = decoded;
            next();
        });
    } else {
        next(); // Allow request to proceed without token
    }
};

app.use(verifyToken); // Apply to all routes


const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString).then(
    ()=>{
    console.log("Connected to MongoDB");
}
).catch(
    (error)=>{
    console.error("Error connecting to MongoDB:", error);
}
);

// Define routes
app.use("/api/users", userRouters);
app.use("/api/products", productRouters);

app.listen(5000,
    ()=>{
    console.log("Server is running on port 5000");
});