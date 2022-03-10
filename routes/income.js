const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// Income Schema
const Income = require("../models/Income");

// @route   GET   api/tracker/income
// @desc    get all income data
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const incomes = await Income.find();

    res.json(incomes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route   POST   api/tracker/income
// @desc    add income data
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { amount, machineID, desc } = req.body;

    const income = new Income({
      amount,
      machineID,
      desc,
    });
    await income.save();

    return res.json(income);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;
