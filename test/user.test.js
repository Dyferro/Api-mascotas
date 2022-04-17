const request = require("supertest");
const app = require("../base/config/app");

describe("Testing users funcionalities", () => {
  let server;
  let port = 3000;

  const user = {
    name: "Veronica Ferro",
    phone: 7896333363,
    email: "aqwedc34c@gmail.com",
    address: "Vlle 8 altos",
    city: "La Habana",
    pasword: "1456987",
  };

  beforeAll((done) => {
    server = app.listen(port);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("Test para crear un nuevo usuario", async () => {
    const res = await request(server).post("/create").send(user);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      ok: true,
      data: expect.any(Object),
    });
  });
});
