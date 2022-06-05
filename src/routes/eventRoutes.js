const express = require('express');
const router =express.Router();
const bodyParser = require('body-parser')
const app = express();
const Event = require('../models/event');
const User = require('../models/user');

app.use(bodyParser.urlencoded({ extended: true }));
// list of routes required

// GET request for adding an event -display form/ /add-event (admin)
router.get('/add-event', function(req,res){
    //render the add-event form
    res.render('{filename}');
})

// POST request for adding an event -> add to database (admin)
router.post('/add-event', async (req,res)=>{
    
    const newEvent = new Event(req.body);
    newEvent.save((error, event)=>{
        if(error) throw error
        res.json(event)
})
})

//GET request for displaying all events according to the form filled (volunteer) --
//fetch from database --/{name of user}/events
router.get('/events/:userID', async (req,res)=>{
    const userID = req.params.userID;
    const user = await User.findById(userID);
   if(user.isAdmin ==true){
//render all events
   }else{
///render according to the preferences
   }
    //if the user is a volunteer then display then fetch 
    //data accordingly
    
})


module.exports = router;