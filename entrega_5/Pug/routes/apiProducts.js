import express from "express";
import { Router } from "express";
import {container} from "../api/products.js.js";
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

// Desc     get todos los productos de la Api
// route    GET /productos
// access   Private
routerProducts.get('/',(req,res)=>{    
    apiProducts.readFile()
        .then((products) =>{
            res.status(200).render('getProducts', {products})
        })
        .catch((error)=>{res.status(400).json(`No se pueden mostrar los productos: ${error}s`)})
});

//Desc      Muestra el FOrmulario para agregar un produto
// route    GET /productos/post
// access   Private
routerProducts.get('/post',(req,res)=>{    
    res.render('postProducts',{})
});

// Desc     post un nuevo producto y se le asigna un ID
// route    POST /productos
// access   Private
routerProducts.post("/",(req,res)=>{
    const newProduct = req.body;
    apiProducts.save(newProduct)
        .then(res.status(200).redirect('/productos'))
        .catch((error)=> res.status(400).json(`No se pudo agregar el producto por el siguiente error: ${error}`)); 
    })   

export default routerProducts;


