const express = require('express');
const ClientsController = require('../controllers/ClientsController');
const router = express.Router();

module.exports = () => {
    // POST /clients/add

    router.post('/add', ClientsController.create)

return router  
}