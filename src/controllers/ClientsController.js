const ClientModel = require('../models/ClientModel')
module.exports = {
    create: (req, res) => {
        const client = new ClientModel({
            name: req.body.name,
            address: req.body.address,
            nip: req.body.nip
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
    },
    delete: (req, res) => {
        ClientModel.findByIdAndDelete(req.params.id)
            .then((deletedClient) => {
                if (deletedClient) {
                    console.log('Client deleted successfully:', deletedClient);
                } else {
                    console.log('Client not found');
                }
                res.status(204).send()
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error while deleting client',
                    error: err
                })
            })

    },
    update: (req,res) => {
        ClientModel.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            address: req.body.address,
            nip: req.body.nip
        })
        .then((updatedClient) => {
            if (updatedClient) {
                console.log('Client updated successfully:', updatedClient);
            } else {
                console.log('Client not found');
            }
            res.status(204).send()
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Error while updating client',
                error: err
            })
        })
    },
    index: (_req,res) => {
        ClientModel.find()
            .then((clients)=>{
                res.status(200).send(clients)
            })
            .catch((err)=>{
                return res.status(500).json({
                    message: 'Error while fetching clients',
                    error: err
                })
            })
    }, 
    client: (req,res) => {
        ClientModel.findById(req.params.id)
        .then((client)=>{
            res.status(200).send(client)
        })
        .catch((err)=>{
            return res.status(500).json({
                message: 'Error while fetching client',
                error: err
            })
        })
    }
}
