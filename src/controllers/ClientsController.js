const ClientModel = require('../models/ClientModel')
module.exports = {
    create: (req, res, next) => {
        const client = new ClientModel({
            name: req.body.name,
            address: req.body.address,
            NIP: req.body.NIP
        })
        // const client = req.body
        // res.send(JSON.stringify(client))
        client.save()
            .then(() => {
                console.log('Client was successfully created')
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error while creating new client',
                    error: err
                })
            })

        return res.status(201).json(client)
    }
}
