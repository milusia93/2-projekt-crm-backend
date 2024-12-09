const express = require('express');
const UsersController = require('../controllers/UsersController');
const router = express.Router();

module.exports = () => {
     // POST /users/signup
     router.post('/signup', UsersController.create)
     router.post('/login', UsersController.login)
     router.post('/logout', UsersController.logout)
     
     return router
}