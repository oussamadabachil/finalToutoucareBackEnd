var express = require("express");
var router = express.Router();
const dbUser = require("../database/users");
const dbDog = require("../database/dogs");

require("../models/connection");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const User = require("../models/users");
const Booking = require("../models/booking");
const Dog = require("../models/dogs");
const bcrypt = require("bcrypt");
const { Router, response } = require("express");


router.post("/all", (req, res) => {
  dbUser.map(async (data) => {
    const hash = bcrypt.hashSync(data.password, 10);
    const newUser = new User({
      code_creche: data.code_creche,
      nom: data.nom,
      prenom: data.prenom,
      chien: data.chien,
      date_de_naissance: data.date_de_naissance,
      telephone: data.telephone,
      email: data.email,
      password: hash,
      rue: data.rue,
      code_postal: data.code_postal,
      ville: data.ville,
      profession: data.profession,
      nom_contact_urgence: data.nom_contact_urgence,
      tel_contact_urgence: data.tel_contact_urgence,
      token: uid2(32),
      imageUri: "",
    });

    let userSaved = await newUser.save();
  });
  res.json({ result: true });

});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password", "codeCreche"])) {
    res.json({ result: false, error: "Veuillez remplir tous les champs" });
    return;
  }
  User.findOne({ email: req.body.email }).then((data) => {
    if (
      data &&
      bcrypt.compareSync(req.body.password, data.password) &&
      req.body.codeCreche == "1234"
    ) {
      res.json({ result: true, data });
    } else {
      res.json({
        result: false,
        error:
          "L'utilisateur n'a pas été trouvé ou mauvais mot de passe (code crèche inclus)",
      });
    }
  });
});

router.get("/all", (req, res) => {
  User.find({}).then((data) => {
    console.log(data);
    if (data) {
      res.json({
        data: data,
      });
    }
  });
});

router.get("/all/:email", (req, res) => {
  User.findOne({
    email: { $regex: new RegExp(req.params.email, "i") },
  }).then((data) => {
    if (data) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.put("/modify/:email", (req, res) => {
  User.updateOne(
    { email: { $regex: new RegExp(req.params.email, "i") } },
    {
      $set: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        chien: req.body.chien,
        date_de_naissance: req.body.date_de_naissance,
        telephone: req.body.telephone,
        rue: req.body.rue,
        code_postal: req.body.code_postal,
        ville: req.body.ville,
        profession: req.body.profession,
        nom_contact_urgence: req.body.nom_contact_urgence,
        tel_contact_urgence: req.body.tel_contact_urgence,
      },
    }
  ).then(() => {
    res.json({ result: true });
  });
});

router.get("/add", async (req, res) => {
  let users = await User.find();

  users.map(async (data) => {
    let dogFind = await dbDog.find((element) => {
      return element.nom === data.chien;
    });

    const newDog = new Dog({
      user: data.id,
      nom: dogFind.nom,
      surnoms: dogFind.surnoms,
      date_de_naissance: dogFind.date_de_naissance,
      genre: dogFind.genre,
      race: dogFind.race,
      Sterilisation: dogFind.Sterilisation,
      sante: dogFind.sante,
      caractere: dogFind.caractere,
      mesententes_chiens: dogFind.mesententes_chiens,
      entente_chats: dogFind.entente_chats,
      entente_enfants: dogFind.entente_enfants,
      habitudes: dogFind.habitudes,
      peurs: dogFind.peurs,
    });

    let dogSaved = await newDog.save();
  });
  res.json({ result: true });
});

router.get("/dogs", (req, res) => {
  Dog.find({}).then((data) => {
    if (data) {
      res.json({
        data,
      });
    }
  });
});

router.get("/dogs/:user", (req, res) => {
  Dog.findOne({ user: req.params.user }).then((data) => {
    if (data) {
      res.json({ result: true, dog: data });
    } else {
      res.json({ result: false, error: "Dog not found" });
    }
  });
});

router.put("/dogs/modify/:user", (req, res) => {
  Dog.updateOne(
    { dogId: req.params._id },
    {
      $set: {
        nom: req.body.nom,
        surnoms: req.body.surnoms,
        date_de_naissance: req.body.date_de_naissance,
        genre: req.body.genre,
        race: req.body.race,
        Sterilisation: req.body.Sterilisation,
        sante: req.body.sante,
        caractere: req.body.caractere,
        mesententes_chiens: req.body.mesententes_chiens,
        entente_chats: req.body.entente_chats,
        entente_enfants: req.body.entente_enfants,
        habitudes: req.body.habitudes,
        peurs: req.body.peurs,
      },
    }
  ).then(() => {
    res.json({ result: true });
  });
});


module.exports = router;
