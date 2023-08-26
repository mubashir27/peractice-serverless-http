const mongoose = require("mongoose");

let conn = null;

const uri = process.env.MONGO_DB;

module.exports = connectDb = async () => {
  if (conn == null) {
    console.log("Creating new connection to database");
    conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("DB connected");
    return conn;
  }
};
