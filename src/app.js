// *importing all environment variables
require("dotenv").config();

// *importing express and creating an instance of it
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

// * initiating the connection with database server
require("./db/mongoose");

require("./utils/setupDb");

// *Instructing server to use json and extended url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10 mb" }));
app.use(cookieParser());

//Importing routes from files
const indexRouter = require("./routes/indexRoutes");
const volunteerRouter = require("./routes/volunteerRoutes");
const eventRouter = require("./routes/eventRoutes");
const enrollmentRouter = require("./routes/enrollmentRoutes");
const adminRouter = require("./routes/adminRoutes");

app.use("/volunteer", volunteerRouter);
app.use("/event", eventRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/", indexRouter);
app.use("/admin", adminRouter);

module.exports = app;