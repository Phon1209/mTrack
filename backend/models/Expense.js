const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    default: "Unspecified Expense",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
