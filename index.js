require("./base/config/config");

const app = require("./base/config/app");
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
