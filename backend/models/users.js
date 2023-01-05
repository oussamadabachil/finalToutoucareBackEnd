const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  chien: String,
  date_de_naissance: String,
  telephone: String,
  email: String,
  password: String,
  codeCreche: String,
  rue: String,
  code_postal: String,
  ville: String,
  profession: String,
  nom_contact_urgence: String,
  tel_contact_urgence: String,
  token: String,
  image: String,
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings' },
});



const User = mongoose.model("users", userSchema);


module.exports = User;