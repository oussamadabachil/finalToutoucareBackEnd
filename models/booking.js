const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    date: Date,
    heureDeDepose: String,
    heureDeRecuperation: String,
    commentaire : String,
    userToken: { type: mongoose.Schema.Types.String, ref: 'users' },
    // idDog : { type: mongoose.Schema.Types.ObjectId, ref: 'testdogs' },


});


const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
//foreing key with poeple


//useEffect(() => {
    
