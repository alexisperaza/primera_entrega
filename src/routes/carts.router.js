const express = require("express");
const router = express.Router();

//Importacion de la clase CartManager
const { cartManager } = require("../controllers/CartManager");

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let cart = await cartManager.getCartById(id);
    res.send(cart);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

/*
La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
    Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    products: Array que contendrá objetos que representen cada producto

*/
router.post("/", async (req, res) => {
  try {
    let result = await cartManager.newCart();

    res.send(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
*/
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    let result = await cartManager.addProduct(cid, pid);

    res.send(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
