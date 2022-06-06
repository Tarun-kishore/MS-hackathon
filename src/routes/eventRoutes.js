const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const auth = require("../middleware/auth");
const { isAdmin } = require("../middleware/userRoles");

// list of routes required

// POST request for adding an event -> add to database (admin)
router.post("/add", auth, isAdmin, async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    await newEvent.save();
    res.status(201).send(newEvent);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:eventId", auth, async (req, res) => {
  try {
    const eventDate = await Event.findById(req.params.eventId);
    res.status(201).send(eventDate);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET request for displaying all events according to the form filled (volunteer) --
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.isadmin == true) {
      const events = await Event.find();

      res.status(200).send(events);
    } else {
      const events = req.user.getRelatedEvents();

      res.status(200).send(events);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
