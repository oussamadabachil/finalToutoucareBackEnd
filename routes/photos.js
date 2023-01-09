var express = require("express");
var router = express.Router();
require("../models/connection");
const User = require("../models/users");
const cloudinary = require("cloudinary").v2;
const uniqid = require("uniqid");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dkqrvbjsd",
  api_key: "689581139722824",
  api_secret: "e6Q3nu_BhazOwsWqiW-72lwveEQ",
});
router.post("/upload", async (req, res) => {
  const photoPath = `./tmp/${uniqid()}.jpg`;

  try {
    const resultMove = await req.files.photoFromFront.mv(photoPath);
    if (!resultMove) {
      const resultCloudinary = await cloudinary.uploader.upload(photoPath);
      res.json({ result: true, url: resultCloudinary.secure_url });
    } else {
      res.json({ result: false, error: resultMove });
    }
  } catch (error) {
    res.json({ result: false, error });
  } finally {
    fs.unlinkSync(photoPath);
  }
});

router.put("/update", async (req, res) => {
  const { id, image } = req.body;
  const result = await User.findByIdAndUpdate(
    id,
    { image: image },
    { new: true }
  );
  res.json({ result: true, user: result });
});

module.exports = router;
