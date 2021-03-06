const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// User Schema
const User = require("../models/User");

// @route   GET  api/auth
// @desc    load user's data (not to verify user credential)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route   POST  api/auth
// @desc    Authorize input credential
// @access  Public
router.post(
  "/",
  [
    check("email", "valid email is required").isEmail(),
    check("password", "Please include password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Invalid Credential" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credential" });
      }

      // jwt sign
      const payload = {
        user: {
          id: user.id,
          authorized: user.authorized,
        },
      };
      jwt.sign(
        payload,
        process.env.jwtPrivateKey,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          return res.json(token);
        }
      );
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
