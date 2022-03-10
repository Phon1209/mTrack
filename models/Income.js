const mongoose = require("mongoose");

const IncomeSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  machineID: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Income", IncomeSchema);
