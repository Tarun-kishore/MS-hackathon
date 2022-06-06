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

//GET request to display the form for updating event

router.get("/edit/:eventID", auth, isAdmin, async(req,res)=>{
//display the form
})


//GET request for displaying all events according to the form filled (volunteer) --
//fetch from database --/{name of user}/events
router.get("/", auth, async (req, res) => {
  if (req.user.isAdmin == true) {
    //render all events
  } else {
    ///render according to the preferences
  }
  //if the user is a volunteer then display then fetch
  //data accordingly
});

module.exports = router;

