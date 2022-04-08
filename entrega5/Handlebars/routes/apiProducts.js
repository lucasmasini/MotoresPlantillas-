import express from "express";
import { Router } from "express";
import {container} from "../api/products.js";
import fs from "fs";

// Declarando las rutas y las apps
const routerProducts = Router();
routerProducts.use(express.json());
routerProducts.use(express.urlencoded({extended:true}));

// Declarando e inicializando un variable con la clase container y sus metodos
let apiProducts = new container("./api/products.txt");

// Declarando funcion que obtenga el numero maximo de productos de la Api
const getLastId = ()=>{
    let productsJSON = fs.readFileSync("./api/products.txt");
    let products = JSON.parse(productsJSON);
    let index = 0;
    products.map((element) => index = element.id)
    return index;
}

// Desc     get all products from de Api
// route    GET /productos
// access   Private
routerProducts.get('/',(req,res)=>{    
    apiProducts.readFile()
        .then((products) =>{
            res.render('datos', {products})
        })
        .catch((error)=>{res.status(400).json(`No se pueden mostrar los productos: ${error}s`)})
});


/*
// Desc     get products by id
// route    GET /api/products/:Id
// access   Private
routerProducts.get('/:id', (req,res)=>{
    const {id} = req.params;
    const lastId = getLastId();
    if(id > lastId){
        res.send({ error : 'producto no encontrado' });
    }
    apiProducts.getById(id)
        .then((result) => res.status(200).json(result))
        .catch((error)=> res.status(400).json(`No se pudo encontrar el producto debido a ${error}`))
})
// Desc     create new product and return ID
// route    POST /api/products
// access   Private
routerProducts.post("/",(req,res)=>{
    const newProduct = req.body;
    apiProducts.save(newProduct)
        .then((result)=> res.status(200).json(result))
        .catch((error)=> res.status(400).json(`No se pudo agregar el producto por el siguiente error: ${error}`));    
})
// Desc     modify product by ID
// route    PUT /api/products/:id
// access   Private
routerProducts.put('/:id',(req,res)=>{
    const productChange = req.body;
    const {id} = req.body;
    const lastId = getLastId();
    if(id > lastId){
        res.send({ error : 'producto no encontrado' });
    }
    apiProducts.getById(id)
        .then((result)=>{
            result.title = productChange.title? productChange.title : result.title;
            result.price = productChange.price? productChange.price : result.price;
            result.thumbnail = productChange.thumbnail? productChange.thumbnail : result.thumbnail;
            res.status(200).json(result);
            console.log("Se modifico el objeto correctamente")
        })
        .catch((error)=> res.status(400).json(`No se pudo modificar el producto debido a: ${error}`))
})
// Desc     delete product by ID and return the eliminated object
// route    DELETE /api/products/:id
// access   Private
routerProducts.delete('/:id',(req,res)=>{
    const {id} = req.body;
    const lastId = getLastId();
    let eliminateProduct;
    apiProducts.getById(parseInt(id))
        .then((result)=>{
            eliminateProduct = result;
        })
        .catch((error)=>error);
    if(id > lastId){
        res.send({ error : 'producto no encontrado' })
    }
    apiProducts.deleteById(id)
        .then(() => {
            res.status(200).json(eliminateProduct)
            console.log(`Se elimino el producto con Id: ${id} correctamente`);
    })
        .catch((error)=> res.status(400).json(`No se pudo encontrar el producto debido a ${error}`))
})
*/

export default routerProducts;


