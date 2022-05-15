const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    // Wait for the promise to resolve, if error occured -> catch
    console.log("Trying to connect to database...");
    await mongoose.connect(process.env.mongoURI);
    console.log("Database Connected!");
  } catch (err) {
    // Display the error message
    console.error(err.message);
    // Kill the app
    process.exit(1);
  }
};

module.exports = connectDatabase;
