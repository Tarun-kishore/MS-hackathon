const request = require("supertest");
const app = require("../app.js");

test("Testing server", async () => {
  await request(app).get("/test").expect(200);
});
