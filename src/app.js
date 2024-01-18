const express = require("express");
const app = express();

//importacion de los Routers
const routerProducts = require("./routes/products.router");
const routerCarts = require("./routes/carts.router");

//middlewares
app.use(express.json());

//Se instancian los routers
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

//Para testear si el servidor esta online
app.get("/ping", (req, res) => {
  res.send("pong");
});

//Se oye en el puerto 8080 e imprime el siguiente texto en consola
app.listen(8080, () => {
  console.log("Aplicacion funcionando en el puerto 8080");
});
