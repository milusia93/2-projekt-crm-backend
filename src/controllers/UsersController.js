const UserModel = require("../models/UserModel");
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
                        res.status(500).json({
                            signedup: false,
                            message: {
                                username: [
                                    "Username has already been taken"
                                ]
                            }

                        })
                    } else if (err.keyPattern.email === 1) {
                        res.status(500).json({
                            signedup: false,
                            message: {
                                email: [
                                    "Email has already been taken"
                                ]
                            }

                        })
                    }

                } else {
                    res.status(500).json({
                        error: err
                    })
                }
            });
    }
}