const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
      validate(value) {
        if (validator.isAfter(value.toISOString()))
          throw new Error("Date is in future");
      },
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value))
          throw new Error("Mobile is not valid");
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is not valid");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
    },
    isStudent: {
      type: Boolean,
    },
    school: {
      type: String,
    },
    organisation: {
      type: String,
    },
    isEmployee: {
      type: Boolean,
    },
    Organisation: {
      type: String,
    },
    educationalBackground: {
      type: String,
    },
    occupation: {
      type: String,
    },
    languages: [
      {
        language: {
          type: String,
        },
      },
    ],
    nationality: {
      type: String,
    },
    address: {
      type: String,
    },
    Locations: [
      {
        Location: {
          type: String,
        },
      },
    ],
    availableTill: {
      type: Date,
    },
    approval: {
      type: "String",
      required: true,
      default: "pending",
    },
    preferences: [
      {
        preference: {
          type: String,
        },
      },
    ],
    skills: [
      {
        skill: {
          type: String,
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
          validate(value) {
            if (!validator.isJWT(value)) throw new Error("token is not JWT");
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "enrolledVolunteers.enrolledVolunteer",
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

//get personalised events recommendation
userSchema.methods.getRelatedEvents = async function () {
  const user = this;

  await user.populate("events");

  const events = await Event.find({
    $or: [
      {
        "preferences.preference": {
          $in: user.preferences.map(
            (preferenceObj) => preferenceObj.preference
          ),
        },
      },
      {
        "skillsRequired.skill": {
          $in: user.skills.map((skillObj) => skillObj.skill),
        },
      },
    ],
    _id: { $nin: user.events.map((eventData) => eventData._id) },
    startsAt: {
      $gte: new Date(),
    },
    "languages.language": {
      $in: user.languages.map((lang) => lang.language),
    },
  }).sort({ startsAt: -1 });

  const recommendedEvents = events.filter((eventData) => {
    if (eventData.volunteersEnrolled >= eventData.volunteersRequired)
      return false;
    const tempArray = user.Locations.map((obj) => obj.Location);
    if (tempArray.includes(eventData.Location)) return true;
  });
  return recommendedEvents;
};

userSchema.statics.findByCredentials = async (mobile, password) => {
  const user = await User.findOne({ mobile });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Unable to login");

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;

  const events = Event.find({
    "enrolledVolunteers.enrolledVolunteer": user._id,
  });

  for (let i = 0, len = events.length; i < len; i++) {
    await events[i].removeVolunteer(user._id);
  }

  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
