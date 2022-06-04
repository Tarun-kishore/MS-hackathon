const request = require("supertest");
const app = require("../app.js");
const { firstUser, secondUser, setupDb } = require("./fixtures/db");

beforeEach(setupDb);
const tempUser = {
  name: "temp name",
  DOB: "Sep 16 2007",
  mobile: "9234567899",
  email: "temp@email.com",
  password: "password",
  isStudent: true,
  isEmployee: false,
};

let token;

test("Signing Up User", async () => {
  const response = await request(app)
    .post("/signup")
    .send(tempUser)
    .expect(201);

  //getting token from cookies
  token = response.headers["set-cookie"][0].split(";")[0].split("=")[1];
});
