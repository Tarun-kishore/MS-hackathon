const { get } = require("http");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    if (!req.cookies.token)
      return res.status(401).send("You need to log in first");
    const decoded = await jwt.verify(req.cookies.token, process.env.SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": req.cookies.token,
    });

    if (!user) {
      return res.clearCookie("token");
    }
    req.user = user;
    req.token = req.cookies.token;
    next();
  } catch (e) {
    res.send(e);
  }
};

module.exports = auth;

