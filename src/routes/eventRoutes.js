const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const auth = require("../middleware/auth");
const { isAdmin, isVolunteer } = require("../middleware/userRoles");
const validator = require("validator");

// list of routes required

// POST request for adding an event -> add to database (admin)
router.post("/add", auth, isAdmin, async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    await newEvent.save();
    res.status(201).send(newEvent);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// PUT request for updating an event
router.put("/edit/:eventID", auth, isAdmin, async (req, res) => {
  const eventID = req.params.eventID;
  const updates = Object.keys(req.body);
  try {
    const eventData = await Event.findById(eventID);
    updates.forEach((update) => (eventData[update] = req.body[update]));

    await eventData.save();
    res.status(200).send(eventData);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get all events

router.get("/all", auth, async (req, res) => {
  try {
    const events = await Event.find({}).sort({ startsAt: 1 });

    res.status(200).send(events);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/active", auth, async (req, res) => {
  try {
    const data = await Event.find({ startsAt: { $gte: new Date() } }).sort({
      startsAt: 1,
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET request for displaying all events according to the form filled (volunteer) --
router.get("/recommended", auth, isVolunteer, async (req, res) => {
  try {
    if (
      !req.user.availableTill ||
      req.user.status == "pending" ||
      validator.isBefore(req.user.availableTill.toISOString())
    )
      return res.status(200).send([]);
    const events = await req.user.getRelatedEvents();

    res.status(200).send(events);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

//DELETE request for deletion of an event using the eventID(admin)

router.delete("/:eventID", auth, isAdmin, async (req, res) => {
  const eventID = req.params.eventID;
  try {
    const eventModel = await Event.findById(eventID);
    await eventModel.remove();

    res.status(200).send({ message: "Event Deleted Successfully" });
  } catch (e) {
    res.status(400).send(e);
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

router.get("/copy/:eventID", auth, isAdmin, async (req, res) => {
  const eventID = req.params.eventID;
  try {
    const eventData = await Event.findById(eventID);
    const tempData = eventData.toJSON();
    delete tempData._id;
    delete tempData.enrolledVolunteers;
    delete tempData.volunteersEnrolled;

    const newEvent = new Event(tempData);
    await newEvent.save();
    res.status(200).send(newEvent);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
