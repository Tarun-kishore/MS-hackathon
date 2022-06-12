const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const validator = require("validator");
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  delete req.body.isAdmin;
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();

    const role = user.isAdmin ? "admin" : "volunteer";
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: false,
      })
      .status(201)
      .json({
        message: "Account Created",
        role,
        user,
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
        expires: false,
      })
      .status(200)
      .send({
        message: "Logged in successfully",
        user,
      });
  } catch (error) {
    res.status(400).send(error);
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

router.get("/profile", auth, async (req, res) => {
  try {
    if (req.user.isAdmin == false) {
      await req.user.populate("events");

      const events = req.user.events;
      let hours = 0;

      for (let i = 0, len = events.length; i < len; ++i) {
        eventData = events[i];
        let date = eventData.startsAt;
        date.setHours(date.getHours() + eventData.duration);
        if (validator.isBefore(date.toISOString())) hours += eventData.duration;
      }

      req.user.numberOfHours = hours;
    }

    res
      .status(200)
      .send({ ...req.user.toJSON(), numberOfHours: req.user.numberOfHours });
  } catch (e) {
    console.log(e);
    res.status(500).send({ e });
  }
});

router.patch("/profile", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  //These fields cannot be updated and should always be fixed
  const nonAllowedUpdates = ["isAdmin", "email", "password", "mobile"];

  const isValidOperation = updates.every(
    (update) => !nonAllowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(200).send(req.user);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/profile", auth, async (req, res) => {
  try {
    await req.user.remove();
    res
      .clearCookie("token")
      .status(200)
      .send({ message: "User profile deleted" });
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/publicProfile/:userId", async (req, res) => {
  try {
    req.user = await User.findById(req.params.userId);

    if (req.user.isAdmin == false) {
      await req.user.populate("events");

      const events = req.user.events;
      let hours = 0;

      for (let i = 0, len = events.length; i < len; ++i) {
        eventData = events[i];
        let date = eventData.startsAt;
        date.setHours(date.getHours() + eventData.duration);
        if (validator.isBefore(date.toISOString())) hours += eventData.duration;
      }

      req.user.numberOfHours = hours;
    }

    const returnUser = {
      ...req.user.toJSON(),
      numberOfHours: req.user.numberOfHours,
    };
    delete returnUser.mobile;
    delete returnUser.email;
    res.status(200).send(returnUser);
  } catch (e) {
    console.log(e);
    res.status(500).send({ e });
  }
});
module.exports = router;
