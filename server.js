const express = require("express");
const connectDatabase = require("./config/database");

const app = express();

connectDatabase();

// Middleware to handle json body
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/users/", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
