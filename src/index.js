const app = require("./index");
// // *setting up a public folder directory path
// app.use(express.static("src/public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// *defining port default at 3000
const port = process.env.PORT || 3001;

// *making server listen at port defined above
app.listen(port, () => {
  console.log("server runnning");
});
