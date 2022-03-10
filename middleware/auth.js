const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ error: "No token provided" });
  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload.user;
  } catch (err) {
    res.status(401).json({ error: "Unauthorized Access" });
  }

  next();
};
