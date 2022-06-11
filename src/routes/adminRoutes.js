const express = require("express");
const { isVolunteer, isAdmin } = require("../middleware/userRoles");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");

const auth = require("../middleware/auth");

// Post request to fetch the the events between the required dates.

router.post("/events", auth, isAdmin, async (req, res) => {
  try {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const reqdEvents = await Event.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({
      startsAt: 1,
    });
    res.status(200).send(reqdEvents);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
