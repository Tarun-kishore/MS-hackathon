const express = require("express");
const router = new express.Router();
const User = require("../models/user");

const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();

    const role = user.isAdmin ? "admin" : "volunteer";
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({
        message: "Account Created",
        role,
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.mobile,
      req.body.password
    );
    const token = await user.generateAuthToken();
    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        message: "Logged in successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.clearCookie("token").status(200).send({
      message: "Logged Out Successfully",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
