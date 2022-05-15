const express = require("express");
const {
  getIncomes,
  addIncome,
  getIncome,
  getIncomePage,
} = require("../controllers/incomeController");
const auth = require("../middleware/auth");
const router = express.Router();

router.route("/").get(auth, getIncomes).post(auth, addIncome);

router.get("/:id", auth, getIncome);

router.get("/page/:id", auth, getIncomePage);

module.exports = router;
