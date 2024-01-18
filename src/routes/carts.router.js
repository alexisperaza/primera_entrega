const express = require("express")
const router = express.Router()

//Importacion de la clase ProductManager 
const {productManager} = require("../ProductManager")


//Endpoint de ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. 
router.get("/", async (req, res) => {

    try {
        //Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
        const limit = req.query.limit;

        let products = await productManager.getProducts(limit);
        //regreso los productos
        res.send(products)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }

    
})


//Endpoint de ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
router.get("/:id", async (req, res) => {

    try {
        //Agregar el soporte para recibir por req.params el pid
        const id = req.params.id;

        let product = await productManager.getProductById(id);
        //regreso el producto
        res.send(product)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }

    
})

module.exports = router;
