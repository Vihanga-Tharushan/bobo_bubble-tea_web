import express from "express";
import mongoose from "mongoose";
import Test from "./models/test.js";
import userRouters from "./routes/userRouters.js";
import productRouters from "./routes/productRouters.js";
import jwt from "jsonwebtoken";


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

//token identify middleware
app.use(
    (req, res, next)=>{
        let token = req.headers.authorization;
        if(token){
            //remove "Bearer " from token
            token = token.replace("Bearer ", "");
    
            jwt.verify(token, "jwt-secret", (err, decoded)=>{
                
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
            res.json({
                message: "Token not provided"
            });
        }
    }
);

const connectionString = "mongodb+srv://admin:1234@cluster0.wppnujz.mongodb.net/?appName=Cluster0";

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
app.use("/users", userRouters);
app.use("/products", productRouters);

app.listen(5000,
    ()=>{
    console.log("Server is running on port 5000");
});