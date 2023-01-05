var express = require("express");
var router = express.Router();
require("../models/connection");

const Booking = require("../models/booking");


// Création de la DB dans Mongoose
router.post("/add/:token/", (req, res) => {
    //check if user already have a booking for this date
    Booking.findOne({ userToken: req.params.token, date: req.body.date }).then(
      (data) => {
        console.log(data);
        if (data === null) {
          const newBooking = new Booking({
            date: req.body.date,
            heureDeDepose: req.body.heureDeDepose,
            heureDeRecuperation: req.body.heureDeRecuperation,
            commentaire: req.body.commentaire,
            userToken: req.params.token,
            // idDog: req.params.idDog,
          });
  
          newBooking.save().then(() => {
            res.json({ result: true });
          });
        } else {
          res.json({
            result: false,
            message: "Vous avez déjà une réservation pour cette date",
          });
        }
      }
    );
  });
  
  router.put("/dataBooking/:token/:date", (req, res) => {
    Booking.findOneAndUpdate(
      { userToken: req.params.token, date: req.params.date },
      {
        heureDeDepose: req.body.heureDeDepose,
        heureDeRecuperation: req.body.heureDeRecuperation,
        commentaire: req.body.commentaire,
      }
    ).then((data) => {
      res.json({ result: true });
    });
  });
  
  router.get("/booking/info/:token/:date", (req, res) => {
    Booking.findOne({ idToken: req.params.token, date: req.params.date }).then(
      (data) => {
        if (data === null) {
          res.json({
            result: false,
            message: "Vous n'avez pas de réservation pour cette date",
          });
        } else {
          res.json({ result: true, data: data });
        }
      }
    );
  });
  
  
  router.get("/allBookingPerUser/:token", (req, res) => {
    Booking.find({ userToken: req.params.token }).then((data) => {
      if (data) {
        res.json({ data: data });
      }
    });
  });
  
  //route qui permet d'afficher que les dates de réservation
  
  router.get("/findUserTokenByDate/:date", (req, res) => {
    Booking.find({ date: req.params.date }).then((data) => {
      if (data) {
        res.json({
          data,
        });
      }
    });
  });
   
  router.get("/count/:date", (req, res) => {
    Booking.countDocuments({ date: req.params.date }).then((data) => {
      if (data) {
        res.json({ data: data });
      } else {
        res.json({ data: 0 });
      }
    });
  });
  
  
  router.get("/booking/:idUser", (req, res) => {
    console.log(req.params.idUser);
    Booking.find({ idUser: req.params.idUser }).then((data) => {
      if (data) {
        res.json({ data: data });
      }
    });
  });
  
  //router supprimer booking par id et date
  router.delete("/delete/:idUser/:date/", (req, res) => {
    Booking.deleteOne({
      user: req.params.idUser,
      date: req.params.date,
      // dog: req.params.idDog,
    }).then((data) => {
      if (data) {
        res.json({ data: data, result: true });
      }
    });
  });
  
  module.exports = router;
  