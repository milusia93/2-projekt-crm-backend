const ActionModel = require("../models/ActionModel");

module.exports = {
    index: (_req, res) => {
        ActionModel.find()
          .then((actions) => {
            res.status(200).send(actions);
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Error while fetching actions",
              error: err,
            });
          });
      },

      action: (req, res) => {
        ActionModel.findById(req.params.id)
          .then((action) => {
            res.status(200).json(action);
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Error while fetching action",
              error: err,
            });
          });
      },

      create: (req, res) => {
        const action = new ActionModel({
            date: req.body.date,
            actionType: req.body.actiontype,
            description: req.body.description,
            // specificClient: req.body.specificClient,
        });
        // const client = req.body
        // res.send(JSON.stringify(client))
        action
          .save()
          .then(() => {
            res.status(201).send(action);
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error while creating new action",
              error: err,
            });
          });
      },
      delete: (req, res) => {
        ActionModel.findByIdAndDelete(req.params.id)
          .then((deletedAction) => {
            if (deletedAction) {
              res.status(200).json({ deleted: true });
            } else {
              res.status(404).json({
                error: "not found",
              });
            }
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Error while deleting action",
              error: err,
            });
          });
      },
      update: (req, res) => {
        ActionModel.findByIdAndUpdate(
          req.params.id,
          {
            date: req.body.date,
            actiontype: req.body.actiontype,
            description: req.body.description,
            // specificClient: req.body.specificClient,
          },
          { new: true }
        )
          .then((updatedAction) => {
            if (updatedAction) {
              console.log("Action updated successfully:", updatedAction);
            } else {
              console.log("Action not found");
            }
            res.status(200).json(updatedAction);
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Error while updating action",
              error: err,
            });
          });
      },
}