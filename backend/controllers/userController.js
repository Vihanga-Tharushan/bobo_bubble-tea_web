import User from "../models/user.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {

    const hashedPassword = bycrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword
    });
    user.save()
        .then(() => {
            res.json({
                message: "User created successfully"
            });
        })
        .catch((err) => {
            res.json({
                message: "Error creating user"
            });
        });
}

export function loginUser(req, res) {

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.json({
                    message: "User not found"
                });
            }
            bycrypt.compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.json({
                            message: "Invalid password"
                        });
                    }

                    const token = jwt.sign({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified
                    }, "jwt-secret");
                    
                    res.json({
                        message: "Login successful",
                        token: token
                    });
                });
        })
        .catch((err) => {
            res.json({
                message: "Error logging in"
            });
        });
}

export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role != "admin"){
        return false;
    }
    return true;
}
