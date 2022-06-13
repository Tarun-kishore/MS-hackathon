const mongoose = require("mongoose");
const { sendCancelationMail } = require("../utils/mail");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
    },
    driveLink: {
      type: String,
    },
    formLink: {
      type: String,
    },
    type: {
      type: String,
      lowercase: true,
    },
    languages: [
      {
        language: {
          type: String,
        },
      },
    ],
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
eventSchema.pre("remove", async function (next) {
  const eventData = this;

  await eventData.populate({
    path: "enrolledVolunteers.enrolledVolunteer",
  });

  const volunteers = eventData.enrolledVolunteers.map(
    (enrolledVolunteer) => enrolledVolunteer.enrolledVolunteer
  );
  const dateString = `${eventData.startsAt.getDate()} / ${
    eventData.startsAt.getMonth() + 1
  } /${eventData.startsAt.getFullYear()} `;
  for (let i = 0, len = volunteers.length; i < len; i++) {
    const volunteer = volunteers[i];
    sendCancelationMail({ dateString, name: eventData.name }, volunteer.email);
  }
  next();
});
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
