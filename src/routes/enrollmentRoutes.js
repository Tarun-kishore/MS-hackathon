const express = require("express");
const { isVolunteer, isAdmin } = require("../middleware/userRoles");
const router = express.Router();
const Event = require("../models/event");
const auth = require("../middleware/auth");
//list of routes for enrollment

//POST request for sending the enrollment (volunteer) -> add enrollment to the enrollments collection
router.post("/enroll/:eventID", auth, isVolunteer, async (req, res) => {
  const eventID = req.params.eventID;
  try {
    if (req.user.approval != "accepted")
      return res.status(403).send({ error: "Volunteer not registered" });
    const eventModel = await Event.findOne({ _id: eventID });

    const finalEvent = await eventModel.addNewVolunteer(req.user._id);

    res.status(201).send(finalEvent);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET request for displaying all enrollments (admin)- fetch from database /requests
router.get("/:enrollment", auth, isAdmin, function (req, res) {
  //display all values in the enrollments db
  //const enrollments = Enrollment.find({});
  //res.render("{filename}", { enrollments });
});

module.exports = router;

