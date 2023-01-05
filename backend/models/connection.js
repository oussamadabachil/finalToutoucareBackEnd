 const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const connectionString = "mongodb+srv://Coralietur:cGgI9NNZcCFpsQTd@cluster0.jegajox.mongodb.net/TTC2";
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
