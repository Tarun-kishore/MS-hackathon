const express = require("express");
const { isVolunteer, isAdmin } = require("../middleware/userRoles");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");

const auth = require("../middleware/auth");
