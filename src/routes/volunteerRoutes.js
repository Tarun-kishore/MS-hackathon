const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/profile", auth, (req, res) => {
  res.status(200).send(req.user);
});
module.exports = router;
