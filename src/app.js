// *importing all environment variables
require("dotenv").config();

// *importing express and creating an instance of it
const express = require("express");
const app = express();

const path = require("path");

// * initiating the connection with database server
require("./db/mongoose");

// *Instructing server to use json and extended url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10 mb" }));

// *setting up all the routes
app.get("/test", (req, res) => {
  res.statusCode(200).json({ message: "Test Succesful! React app running" });
});

module.exports = app;
