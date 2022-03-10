const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDatabase = async () => {
  try {
    // Wait for the promise to resolve, if error occured -> catch
    console.log("Trying to connect to database...");
    await mongoose.connect(db);
    console.log("Database Connected!");
  } catch (err) {
    // Display the error message
    console.error(err.message);
    // Kill the app
    process.exit(1);
  }
};

module.exports = connectDatabase;
