const mongoose = require('mongoose');
 
const invoicesSchema = mongoose.Schema({
    date: Date,
    heureDeDepose:  String,
    heureDeRecuperation: String,
    prix: Number,
    userToken: { type: mongoose.Schema.Types.String, ref: 'users' },
});

const Invoice = mongoose.model("invoices", invoicesSchema);

module.exports = Invoice;
//foreing key with poeple
