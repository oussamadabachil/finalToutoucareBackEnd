require("../models/connection");
var express = require("express");

var router = express.Router();
const { checkBody } = require("../modules/checkBody");

const Invoice = require("../models/invoices");

router.post("/add", (req, res) => {
  const newInvoice = new Invoice({
    date: req.body.date,
    heureDeDepose: req.body.heureDeDepose,
    heureDeRecuperation: req.body.heureDeRecuperation,
    commentaire: req.body.commentaire,
    prix: req.body.prix,
    userToken: req.body.token,
  });
  newInvoice.save().then(() => {
    res.json({ result: true });
  });
});

router.get("/getInvoices/:token", (req, res) => {
  Invoice.find({ userToken: req.params.token }).then((data) => {
    res.json(data);
  });
});

router.get("/:dateFrom/:dateTo/:token", (req, res) => {
  Invoice.find({
    date: { $gte: req.params.dateFrom, $lte: req.params.dateTo },
    userToken: req.params.token,
  }).then((data) => {
    res.json(data);
  });
});

module.exports = router;
