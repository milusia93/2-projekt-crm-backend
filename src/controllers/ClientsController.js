const ClientModel = require("../models/ClientModel");
const ActionModel = require("../models/ActionModel");
module.exports = {
  index: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const sortingDirection = req.query.direction;
    const sortingCategory =req.query.category 

    
    const sortMethods = {
      none: { method: 1},
      ascending: { method: 1 },
      descending: { method: -1 },
    };

    const startIndex = (page - 1) * limit;
    const total = await ClientModel.countDocuments();

    console.log(req.query)

    ClientModel.find()
      .skip(startIndex)
      .limit(limit)
      .sort({[sortingCategory] : sortMethods[sortingDirection].method })
      .then((clients) => {
        res.status(200).json({
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          data: clients,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while fetching clients",
          error: err,
        });
      });

    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 3;

    // const startIndex = (page - 1) * limit;
    // const total = ClientModel.countDocuments();
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
          console.log(deletedClient);
          ActionModel.deleteMany({ specificClient: deletedClient._id }).catch(
            (err) => {
              res.json(err);
            }
          );
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
