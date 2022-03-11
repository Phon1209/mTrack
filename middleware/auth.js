const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ error: "No token provided" });
  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    if (!payload.user.authorized) throw { message: "Unauthorized Access" };

    req.user = payload.user;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
