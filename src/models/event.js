const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      lowercase: true,
      enum: ["play sessions", "translations", "virtual sessions"],
    },
    language: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
    },
    Location: {
      type: String,
      required: [true, "Location is required"],
    },

    date: {
      type: Date,
      required: [true, "Please enter the date of the event."],
    },

    startsAt: {
      type: Date,
      required: [true, "Please enter the start time of the event"],
    },

    duration: {
      type: Number, //duration is in number of hours
      required: [true, "Please enter the event duration"],
    },

    volunteersEnrolled: {
      type: Number,
      default: 0,
    },

    volunteersRequired: {
      type: Number,
    },

    preferences: [
      {
        preference: {
          type: String,
        },
      },
    ],
    skillsRequired: [
      {
        skill: {
          type: String,
        },
      },
    ],
    enrolledVolunteers: [
      {
        enrolledVolunteer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

eventSchema.methods.addNewVolunteer = async function (volunteerId) {
  const Event = this;

  Event.volunteersEnrolled++;

  Event.enrolledVolunteers = Event.enrolledVolunteers.concat({
    enrolledVolunteer: volunteerId,
  });

  await Event.save();

  return Event;
};

eventSchema.methods.removeVolunteer = async function (volunteerID) {
  const Event = this;
  Event.volunteersEnrolled--;
  const index = Event.enrolledVolunteers.findIndex((obj) => {
    obj.enrolledVolunteer.equals(volunteerID);
  });
  Event.enrolledVolunteers.splice(index, 1);

  await Event.save();
  return Event;
};
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
