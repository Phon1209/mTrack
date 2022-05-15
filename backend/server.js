const express = require("express");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv").config();

const app = express();

connectDatabase();

// Middleware
// handle application/json to json body
app.use(express.json());
// parse parse application/x-www-form-urlencoded to object
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/users/", require("./routes/users"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/tracker/income/", require("./routes/income"));
app.use("/api/tracker/expense/", require("./routes/expense"));

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
