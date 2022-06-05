const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        description: {
            type: String
        },
        type: {
            type: String,
            lowercase: true,
            enum: ["play sessions", "translations", "virtual sessions"]
        },

        location: {
            type: String,
            required: [true, "Location is required"]
        },

        date: {
            type: Date,
            required: [true, "Please enter the date of the event."]
        },

        startsAt: {
            type: String,
            required: [true, "Please enter the start time of the event"]
        },

        duration: {
            type: Number, //duration is in number of hours
            required: [true, "Please enter the event duration"]

        },

        volunteersEnrolled: {
            type: Number,
            default: 0
        },

        volunteersRequired: {
            type: Number
        },

        skillsRequired: {
            type: [String],
            default: ['None']
        }

    });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;