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

// // *setting up a public folder directory path
// app.use(express.static("src/public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
// *setting up all the routes
app.get("/test", (req, res) => {
  res.json({ message: "Test Succesful! React app running" });
});

// *defining port default at 3000
const port = process.env.PORT || 3001;

// *making server listen at port defined above
app.listen(port, () => {
  console.log("server runnning");
});
