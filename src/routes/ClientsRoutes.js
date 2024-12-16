const express = require('express');
const ClientsController = require('../controllers/ClientsController');
const router = express.Router();

module.exports = () => {
    // POST /clients/add
    router.post('/add', ClientsController.create)

    // PUT/clients/update/:id
    router.put('/update/:id', ClientsController.update)

    // DELETE /clients/delete/:id
    router.delete('/delete/:id', ClientsController.delete)

    // GET /clients
    router.get('/', ClientsController.index)

    // GET /clients/:id
    router.get('/:id', ClientsController.client)

    

    return router
}