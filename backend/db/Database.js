const mongoose = require("mongoose");

const connection = () => {
  // When the strict option is set to true, Mongoose will ensure that only the fields that are specified in your schema
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Succesfully connceted to the MONGODB");
  });
};

module.exports = connection;
