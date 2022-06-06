const request = require("supertest");
const app = require("../app.js");
const { firstUser, secondUser, setupDb } = require("./fixtures/db");
const User = require("../models/user");

beforeAll(setupDb);
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

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/login")
    .send({
      mobile: "6666666666",
      password: "temppassword",
    })
    .expect(400);
});

test("Signing Up User", async () => {
  const response = await request(app)
    .post("/signup")
    .send(tempUser)
    .expect(201);

  //getting token from cookies
  token = response.headers["set-cookie"][0];

  //Checking User was saved in database
  const user = await User.findById(response.body.user._id);

  expect(user).not.toBeNull();

  //Asserting response body
  expect(response.body).toMatchObject({
    user: {
      name: "temp name",
      mobile: "9234567899",
      email: "temp@email.com",
    },
  });

  expect(user.password).not.toBe("password");
});

test("Should be able to access profile after Signup", async () => {
  const response = await request(app)
    .get("/profile")
    .set("Cookie", [token])
    .expect(200);
});

test("Should be able to logout", async () => {
  const response = await request(app)
    .post("/logout")
    .set("Cookie", [token])
    .expect(200);
  expect(response.headers["set-cookie"][0].split(";")[0]).toBe("token=");

  token = undefined;
});

test("Should not be able to logout without authorization", async () => {
  const response = await request(app).post("/logout").expect(401);
});

test("Should not be able to access profile without authorization", async () => {
  const response = await request(app).get("/profile").expect(401);
});

test("Should not signup multiple users with same credentials", async () => {
  const response = await request(app)
    .post("/signup")
    .send(tempUser)
    .expect(500);
});

test("login test", async () => {
  const response = await request(app)
    .post("/login")
    .send({
      mobile: tempUser.mobile,
      password: tempUser.password,
    })
    .expect(200);

  token = response.headers["set-cookie"][0];
});

test("Should be able to access profile after login", async () => {
  const response = await request(app)
    .get("/profile")
    .set("Cookie", [token])
    .expect(200);
});

test("Should be able to update profile after login", async () => {
  const response = await request(app)
    .patch("/profile")
    .send({
      name: "updated name",
    })
    .set("Cookie", [token])
    .expect(200);

  expect(response.body).toMatchObject({
    name: "updated name",
  });
});

test("Should not be able to update profile with request containing non Allowed fields", async () => {
  const response = await request(app)
    .patch("/profile")
    .send({
      name: "updated name",
      mobile: "6677889955",
    })
    .set("Cookie", [token])
    .expect(400);

  expect(response.body).toMatchObject({
    error: "invalid updates",
  });
});

test("Should be able to logout after login", async () => {
  const response = await request(app)
    .post("/logout")
    .set("Cookie", [token])
    .expect(200);
  expect(response.headers["set-cookie"][0].split(";")[0]).toBe("token=");

  token = undefined;
});

test("cannot delete profile without login", async () => {
  const response = await request(app).delete("/profile").expect(401);
});

test("cannot delete profile without login", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      mobile: tempUser.mobile,
      password: tempUser.password,
    })
    .expect(200);

  token = res.headers["set-cookie"][0];

  const response = await request(app)
    .delete("/profile")
    .set("Cookie", [token])
    .expect(200);

  expect(response.headers["set-cookie"][0].split(";")[0]).toBe("token=");
  token = undefined;
});
