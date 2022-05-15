// Expense Schema
const Expense = require("../models/Expense");

// @route   GET   api/tracker/expense
// @desc    get all expense data
// @access  Private
const getExpenses = async (req, res) => {
  const param = {};
  if (req.query.before || req.query.after) param.date = {};
  if (req.query.after) param.date["$gte"] = new Date(req.query.after);
  if (req.query.before) param.date["$lt"] = new Date(req.query.before);

  try {
    const expense = await Expense.find(param);

    res.json(expense);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @route   POST   api/tracker/expense
// @desc    add expense data
// @access  Private
const addExpense = async (req, res) => {
  try {
    const { amount, desc, date } = req.body;

    const expense = new Expense({
      amount,
      date,
      desc,
    });
    await expense.save();

    return res.json(expense);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @route   GET   api/tracker/expense/:id
// @desc    get one expense entry
// @access  Private
const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: "Entries not found" });
    }

    return res.json(expense);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @TODO: end point for pagination
// @route   GET   api/tracker/expense/page/:id
// @desc    get n entries (default: 10) for page
// @access  Private
const getExpensePage = async (req, res) => {};

module.exports = {
  getExpenses,
  getExpense,
  addExpense,
  getExpensePage,
};
