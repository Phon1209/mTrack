const express = require("express");
const {
  getExpense,
  addExpense,
  getExpenses,
  getExpensePage,
} = require("../controllers/expenseController");
const auth = require("../middleware/auth");
const router = express.Router();

router.route("/").get(auth, getExpense).post(auth, addExpense);

router.get("/:id", auth, getExpense);

router.get("/page/:id", auth, getExpensePage);

module.exports = router;
