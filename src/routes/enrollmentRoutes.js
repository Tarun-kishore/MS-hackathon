const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const app = express();
const Event = require('../models/event');
const User = require('../models/user');
const Enrollment = require('../models/enrollment');
const res = require('express/lib/response');

app.use(bodyParser.urlencoded({ extended: true }));


//list of routes for enrollment

//POST request for sending the enrollment (volunteer) -> add enrollment to the enrollments collection
router.post('/enroll/:userID/:eventID', async (req, res) => {
    const userID = req.params.userID;
    const eventID = req.params.eventID;
    const event = await Event.findOneAndUpdate({ _id: eventID }, { volunteersEnrolled: volunteersEnrolled + 1 }, { new: true });
    const user = await User.findById(userID);

    const newEnrollment = new Enrollment({
        volunteer: user,
        event: event
    });

    newEnrollment.save((error, newEnrollment) => {
        if (error) throw error
        res.json(newEnrollment)
    })

})



//GET request for displaying all enrollments (admin)- fetch from database /requests
router.get('/enrollments',function(req,res){
    //display all values in the enrollments db
    const enrollments = Enrollment.find({});
    res.render('{filename}', {enrollments})
})


module.exports = router;