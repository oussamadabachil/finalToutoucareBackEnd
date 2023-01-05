var express = require("express");
var router = express.Router();
require("../models/connection");

const cloudinary = require('cloudinary').v2;
const uniqid = require('uniqid');
const fs = require('fs');
const User = require("../models/users");

const IMAGE_PATH = "https://res.cloudinary.com/dpapzrkqw/image/upload/v1671611852/";


router.post('/upload/:token', async (req, res) => {
  const generatedName = `${req.params.token}.jpg`;
  const photoPath = `./tmp/${generatedName}`;

  /*Copie du fichier dans un dossier temporaire via la méthode mv()*/
  const resultMove = await req.files.photoFromFront.mv(photoPath);
  
  if (!resultMove) {
    /*Upload de la photo sur cloudinary*/
    const resultCloudinary = await cloudinary.uploader.upload(photoPath, {
      public_id: req.params.token,
      folder: 'toutouCare',
      unique_filename: false,
      overwrite: true
    })  
  } else {
      res.json({ result: false, error: resultMove });
    } 
  /*On supprime le fichier temporaire après l'upload via module fs*/
  fs.unlinkSync(photoPath);
});


module.exports = router;