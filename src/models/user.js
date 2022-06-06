const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    languages: {
      type: String,
    },
    nationality: {
      type: String,
    },
    Location: {
      type: String,
    },
    availableTill: {
      type: Date,
    },
    approval: {
      type: "String",
      required: true,
      default: "notRegistered",
    },
    canTravel: {
      type: Boolean,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
