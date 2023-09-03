/* const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;
const { login } = require("../controllers/auth");
const app = require("../app");
app.post("auth/login", login);


describe("test login controller", () => {
  let server;
  let response;

 beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => (server = app.listen(PORT)))
      .catch((e) => process.exit(1));
  });

  afterAll(() => {
    mongoose.disconnect(DB_HOST).then(() => {
      server.close();
    });
  });

  beforeEach(async () => {
    response = await request(app).post("/api/auth/login").send({
      email: "test@mail.com",
      password: "123456",
    });
  });

 
  test("response.status(200)", async () => {
  
    expect(response.status).toBe(200);
  });

  
  test("get token", async () => {
    const { token } = response.body;
   
    expect(token).toBeTruthy();
  });


  test("user object with two fields of string data type", async () => {
    const { user } = response.body;
   
    expect(typeof user.email).toBe("string");
 
    expect(typeof user.subscription).toBe("string");
  });
}); */