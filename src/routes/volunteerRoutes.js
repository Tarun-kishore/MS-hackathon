const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { isVolunteer } = require("../middleware/userRoles");

router.get("/profile", auth, isVolunteer, (req, res) => {
  res.status(200).send(req.user);
});

router.patch("/profile", auth, isVolunteer, async (req, res) => {
  const updates = Object.keys(req.body);
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

module.exports = router;
