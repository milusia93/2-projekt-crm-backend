const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');

module.exports = {
    create: (req, res) => {
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser
            .save()
            .then(() => {
                res.status(201).json({
                    signedup: true,
                    user: {
                        username: newUser.username,
                        email: newUser.email
                    }
                });
            })
            .catch((err) => {

                if (err.code === 11000) {
                    if (err.keyPattern.username === 1) {
                        res.status(409).json({
                            signedup: false,
                            message: {
                                username: [
                                    "Username has already been taken"
                                ]
                            }
                            // error: true,
                            // message: "Username has already been taken",
                            // user: req.body

                        })
                    } else if (err.keyPattern.email === 1) {
                        res.status(409).json({
                            signedup: false,
                            message: {
                                email: [
                                    "Email has already been taken"
                                ]
                            }

                            // error: true,
                            // message: "Email has already been taken",
                            // user: req.body
                        })
                    }

                } else {
                    res.status(500).json({
                        error: err
                    })
                }
            });
    },
    login: (req, res) => {
        UserModel.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    res.status(409).json({
                        error: true,
                        message: "User does not exist",
                        user: {username: req.body.username}
                    })
                    return
                }
        

                bcrypt.compare(req.body.password, user.password, (err, logged) => {
                    if (err) {
                        res.status(500).json({
                            error: true,
                            message: "Login error",
                        })
                        return;
                    }

                    if (logged) {
                        const token = user.generateAuthToken(user);
                        res.status(200).json({
                            username: user.username, 
                            message: "You successfully logged in",
                            jwt: token
                        })
                    } else {
                        res.status(400).json({
                            error: true,
                            message: "Login data do not match",
                            user: {username: req.body.username}
                        })
                        return;
                    }
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    message: "Error while loging in",
                    error: err,
                });
            })
    },
    logout: (req,res) => {
        res.status(200).json({
            message: "User loged out"
        })
        if (err) {
            console.error(err)
        }
    }
}