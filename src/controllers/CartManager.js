const fs = require("fs");

class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cartsById = carts.find((cart) => cart.id === Number(id));
    if (cartsById === undefined) {
      return "Error: No se encontro carrito";
    }
    return cartsById.products;
  }

  async newCart() {
    let carts = await cartManager.getCarts();

    const newCart = {
      id: carts.length == 0 ? 1 : carts[carts.length - 1].id + 1,
      products: [],
    };

    carts.push(newCart);
    await this.saveCarts(carts);

    return "Se agrego carrito";
  }

  async addProduct(cid, pid) {
    let carts = await cartManager.getCarts();

    const cartIndex = carts.findIndex((c) => c.id === Number(cid));

    if (cartIndex !== -1) {
      const productIndex = carts[cartIndex].products.findIndex(
        (p) => p.id === Number(pid)
      );

      if (productIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementar la cantidad
        carts[cartIndex].products[productIndex].quantity++;
      } else {
        // Agregar el producto al carrito con cantidad 1
        carts[cartIndex].products.push({ id: Number(pid), quantity: 1 });
      }

      // Guardar la lista actualizada de carritos
      await this.saveCarts(carts);
    } else {
      return "Carrito no encontrado.";
    }

    return "Se agrego carrito";
  }

  async saveCarts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
  }
}

const cartManager = new CartManager("./src/data/cart.json");

module.exports = { cartManager };
