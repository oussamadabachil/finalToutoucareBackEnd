const mongoose = require("mongoose");
const dogSchema = mongoose.Schema({
    nom: String,
    surnoms: String,
    date_de_naissanceDog: String,
    genre: String,
    race: String,
    Sterilisation: Boolean,
    sante: String,
    caractere: String,
    mesententes_chiens: String,
    entente_chats: Boolean,
    entente_enfants: Boolean,
    habitudes: String,
    peurs: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  })


  const Dog = mongoose.model("dogs", dogSchema);
  module.exports = Dog ;