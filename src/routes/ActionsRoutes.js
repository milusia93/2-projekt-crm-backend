const express = require('express');
const ActionsController = require('../controllers/ActionsController');
const router = express.Router();

module.exports = () => {
    // POST /actions/add
    router.post('/add', ActionsController.create)

    // PUT/actions/update/:id
    router.put('/update/:id', ActionsController.update)

    // DELETE /actions/delete/:id
    router.delete('/delete/:id', ActionsController.delete)

    // GET /actions
    router.get('/', ActionsController.index)

     // GET /actions/:id
     router.get('/:id', ActionsController.client)

    return router
}