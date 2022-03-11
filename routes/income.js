const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// Income Schema
const Income = require("../models/Income");

// @route   GET   api/tracker/income
// @desc    get all income data
// @access  Private
router.get("/", auth, async (req, res) => {
  const param = {};
  if (req.query.before || req.query.after) param.date = {};
  if (req.query.after) param.date["$gte"] = new Date(req.query.after);
  if (req.query.before) param.date["$lt"] = new Date(req.query.before);

  try {
    const incomes = await Income.find(param);

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

// @route   GET   api/tracker/income/:id
// @desc    get one income entry
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ error: "Entries not found" });
    }

    return res.json(income);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @TODO: end point for pagination
// @route   GET   api/tracker/income/page/:id
// @desc    get n entries (default: 10) for page
// @access  Private
module.exports = router;
