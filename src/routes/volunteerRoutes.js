const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { isVolunteer } = require("../middleware/userRoles");

router.post("/register", auth, isVolunteer, async (req, res) => {
  req.body.approval = "pending";
  const updates = Object.keys(req.body);
  //These fields cannot be updated and should always be fixed
  const nonAllowedUpdates = ["isAdmin", "email", "password", "mobile"];

  const isValidOperation = updates.every(
    (update) => !nonAllowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "invalid information" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.status(200).send(req.user);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
