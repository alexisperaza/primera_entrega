const fs = require('fs');


class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getProducts(limit) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      return limit ? JSON.parse(data).slice(0, limit) : JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  
  async getProductById(id) {

    const products = await this.getProducts(undefined);
    const productById = products.find(product => product.id === Number(id));
    if(productById===undefined){
        return "Error: No se encontro producto"
    }
    return productById;
  }

  async addProduct(product) {

    let products = await productManager.getProducts();
    // Validar campos obligatorios
    const { 
        title, 
        description, 
        code, 
        price, 
        stock, 
        category,
        thumbnails
    } = product;

    if (!title || !description || !code || !price || !stock || !category) {
        return 'Todos los campos son obligatorios.'
    }

    // Crear el nuevo producto con los campos proporcionados
    const newProduct = {

        //id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
        id: products[products.length - 1].id + 1,
        title,
        description,
        code,
        price,
        status: true, // Por defecto
        stock,
        category,
        thumbnails: thumbnails || [], // Si no se proporciona, se establece como un array vacío
    };

    products.push(newProduct);
    await this.saveProducts(products);

    return "Se agrego efectivamente";
  }

    async updateProduct(id, updatedFields) {
      const products = await this.getProducts();
      const index = products.findIndex(product => product.id === Number(id));
  
      if (index !== -1) {
          products[index] = { ...products[index], ...updatedFields };
          await this.saveProducts(products);
          return products[index];
      }
  
      return "No se encontro el producto"; // No se encontró el producto con el ID especificado.
    }


  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter(product => product.id !== Number(id));
    await this.saveProducts(updatedProducts);
    return "Se elimino producto"
  }







  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
  }
}


const productManager = new ProductManager('productos.json');

module.exports = {productManager};