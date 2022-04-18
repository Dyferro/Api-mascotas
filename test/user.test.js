//Imports
import request from "supertest";
import app from "../base/config/app";

const user = {
  name: "Veronica Ferro",
  phone: 78963463,
  email: "aqwed47c@gmail.com",
  address: "Vlle 8 altos",
  city: "La Habana",
  pasword: "1456987",
};

describe("Testing users funcionalities", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3000);
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

  it("Listar usuarios", async () => {
    const res = await request(server).get("/userslist");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      ok: true,
      data: expect.any(Array),
    });
  });

  it("Obtener usuario por id", async () => {
    const res = await request(server).get(`/user/${user._id}`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      ok: true,
      data: expect.any(Object),
    });
  });

  it("Modificar usuario", async () => {
    const res = await request(server)
      .put(`/modifyuser/${user._id}`)
      .send({ phone: 3654 });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      ok: true,
      data: expect.any(Object),
    });
  });

  it("Eliminar usuario", async () => {
    const res = await request(server).delete(`/deleteuser/${user._id}`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      ok: true,
      data: expect.any(Object),
    });
  });
});
