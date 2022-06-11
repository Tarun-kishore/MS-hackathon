const express = require("express");
const { isVolunteer, isAdmin } = require("../middleware/userRoles");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");

const auth = require("../middleware/auth");
//list of routes for enrollment

//POST request for sending the enrollment (volunteer) -> add enrollment to the enrollments collection
router.post("/enroll/:eventID", auth, isVolunteer, async (req, res) => {
  const eventID = req.params.eventID;

  try {
    if (req.user.approval != "accepted")
      return res.status(403).send({ error: "Volunteer not registered" });
    const eventModel = await Event.findOne({ _id: eventID });

    if (eventModel.volunteersEnrolled >= eventModel.volunteersRequired)
      return res.status(401).send({ error: "Event already full" });

    const notExist = eventModel.enrolledVolunteers.every(
      (enrolledVolunteerObject) =>
        !enrolledVolunteerObject.enrolledVolunteer.equals(req.user._id)
    );

    if (!notExist)
      return res.status(401).send({ error: "User already enrolled" });

    const finalEvent = await eventModel.addNewVolunteer(req.user._id);

    res.status(201).send(finalEvent);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
// POST request for unenrolling a volunteer
router.post("/unenroll/:eventID", auth, isVolunteer, async (req, res) => {
  const eventID = req.params.eventID;

  try {
    const eventModel = await Event.findOne({ _id: eventID });

    const notExist = eventModel.enrolledVolunteers.every(
      (enrolledVolunteerObject) =>
        !enrolledVolunteerObject.enrolledVolunteer.equals(req.user._id)
    );

    if (notExist)
      return res
        .status(401)
        .send({ error: "User is not enrolled for this event." });
    const updatedEvent = await eventModel.removeVolunteer(req.user._id);

    res.status(201).send(updatedEvent);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//GET request for displaying all enrollments  for particular event(admin)-
router.get("/volunteers/:eventId", auth, isAdmin, async (req, res) => {
  try {
    const eventData = await Event.findById(req.params.eventId);

    await eventData.populate({ path: "enrolledVolunteers.enrolledVolunteer" });
    res.status(200).send(eventData.enrolledVolunteers);
  } catch (e) {
    res.status(500).send(e);
  }
});

//  //GET requests to display all the volunteers that have been approved (admin view)
//  router.get("/requests/approved")

//GET request to approve the registration of the volunteer(admin)
router.get("/requests/approve/:userId", auth, isAdmin, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId });
    user.approval = "accepted";
    await user.save();
    res.status(200).send({ message: "user approval successful" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/requests/reject/:userId", auth, isAdmin, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId });
    user.approval = "rejected";
    await user.save();
    res.status(200).send({ message: "user rejection successful" });
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET request to display all the requests pending for approval(admin)
router.get("/requests", auth, isAdmin, async (req, res) => {
  try {
    const data = await User.find({ approval: "pending", isAdmin: false });

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET request to display all the requests that have been approved (admin)
router.get("/requests/approved", auth, isAdmin, async (req, res) => {
  try {
    const approvedUsers = await User.find({
      approval: "accepted",
      isAdmin: false,
    });
    res.status(200).send(approvedUsers);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET request to display all the requests pending for approval(admin)
router.get("/requests", auth, isAdmin, async (req, res) => {
  try {
    const data = await User.find({ approval: "pending", isAdmin: false });
    console.log(data);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET request to display all the requests that have been processed (admin)
router.get("/requests/approved", auth, isAdmin, async (req, res) => {
  try {
    const approvedUsers = await User.find({
      approval: "accepted",
      isAdmin: false,
    });
    res.status(200).send(approvedUsers);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
