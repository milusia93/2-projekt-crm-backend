const ClientModel = require("../models/ClientModel");
module.exports = {
  index: (_req, res) => {
    ClientModel.find()
      .then((clients) => {
        res.status(200).send(clients);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while fetching clients",
          error: err,
        });
      });
  },
  create: (req, res) => {
    const client = new ClientModel({
      name: req.body.name,
      address: req.body.address,
      nip: req.body.nip,
    });
    client
      .save()
      .then(() => {
        res.status(201).send(client);
      })
      .catch((err) => {
        console.log("test");
        res.status(500).json({
          message: "Error while creating new client",
          error: err,
        });
      });
  },
  delete: (req, res) => {
    ClientModel.findByIdAndDelete(req.params.id)
      .then((deletedClient) => {
        if (deletedClient) {
          res.status(200).json({ deleted: true });
        } else {
          res.status(404).json({
            error: "not found",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while deleting client",
          error: err,
        });
      });
  },
  update: (req, res) => {
    ClientModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        nip: req.body.nip,
      },
      { new: true }
    )
      .then((updatedClient) => {
        if (updatedClient) {
          console.log("Client updated successfully:", updatedClient);
        } else {
          console.log("Client not found");
        }
        res.status(200).json(updatedClient);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while updating client",
          error: err,
        });
      });
  },

  client: (req, res) => {
    ClientModel.findById(req.params.id)
      .populate("actions")
      .then((client) => {
        res.status(200).json(client);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while fetching client",
          error: err,
        });
      });
  },
};