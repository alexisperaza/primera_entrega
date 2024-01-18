const express = require("express")
const router = express.Router()

//Importacion de la clase ProductManager 
const {productManager} = require("../ProductManager")

//La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
router.get("/", async (req, res) => {

    try {
        const limit = req.query.limit;
        let products = await productManager.getProducts(limit);
        res.send(products)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }

    
})


//La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
router.get("/:id", async (req, res) => {

    try {
        const id = req.params.id;

        let product = await productManager.getProductById(id);
        res.send(product)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }

    
})



// Ruta raíz POST / para agregar un nuevo producto
router.post("/", async (req, res) => {    
    try {

        let result = await productManager.addProduct(req.body);
  
        //regreso el producto
        res.send(result)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }
})


// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
router.put("/:id", async (req, res) => {    
    try {

        const id = req.params.id;
        let products = await productManager.getProducts();
        console.log(id);
  

        //regreso el producto
        res.send("Add a book")

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }
})


// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
router.delete("/:id", async (req, res) => {    
    try {

        const id = req.params.id;
        let result = await productManager.deleteProduct(id);
        res.send(result)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }
})




module.exports = router;
