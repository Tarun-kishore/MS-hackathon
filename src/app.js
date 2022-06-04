// *importing all environment variables
require("dotenv").config();

// *importing express and creating an instance of it
const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");

// * initiating the connection with database server
require("./db/mongoose");

// *Instructing server to use json and extended url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10 mb" }));
app.use(cookieParser());

//Importing routes from files
const indexRouter = require("./routes/indexRoutes");
const volunteerRouter = require("./routes/volunteerRoutes");

app.use("/volunteer", volunteerRouter);
app.use("/", indexRouter);

module.exports = app;
