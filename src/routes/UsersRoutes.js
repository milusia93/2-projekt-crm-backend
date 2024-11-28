const express = require('express');
const UsersController = require('../controllers/UsersController');
const router = express.Router();

module.exports = () => {
     // POST /users/signup
     router.post('/signup', UsersController.create)
     
     return router
}