//Imports
import request from "supertest";
import app from "../base/config/app";

const user = {
  name: "Tyrion Ferro",
  phone: 78963464523,
  email: "aqwccd47c@gmail.com",
  address: "Habana",
  city: "La Habana",
  pasword: "1456980007",
};

const auth = {
  phone: 78963464523,
  pasword: "1456980007",
};

const _id = '625092b727481e3349615bc1';

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
    const res = await request(server).post('/create').send(user);
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
    const res = await request(server).get(`/user/${_id}`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      ok: true,
      data: expect.any(Object),
    });
  });

  it("Modificar usuario", async () => {
    const res = await request(server)
      .put(`/modifyuser/${_id}`)
      .send({
        phone: 3654
      });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      ok: true,
      data: expect.any(Object),
    });
  });

  it("Eliminar usuario", async () => {
    const res = await request(server).delete(`/deleteuser/${_id}`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      ok: true,
      user: expect.any(Object),
    });
  });

  it('Test del login', async () => {
    const res = await request(server).post('/login').send(auth);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      ok: true,
      user: expect.any(Object),
    });
  });
});