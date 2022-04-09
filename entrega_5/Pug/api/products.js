import fs from 'fs';

const products = 
[
    {
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: 1
    },
    {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2
    },    
    {
        title: 'Lapiz',
        price: 90,
        thumbnail: 'https://img.freepik.com/vector-gratis/diseno-lapiz-escribiendo_1095-187.jpg',
        id: 3
    },
    {
        title: 'Carpeta',
        price: 270,
        thumbnail: 'http://www.congresoinsumos.com.ar/productos/1302-500-010.jpg',
        id: 4
    },
    {
        title: 'Cartuchera',
        price: 420,
        thumbnail: 'https://vasari.vteximg.com.br/arquivos/ids/182695-1000-1000/VPT172144-NG.jpg?v=637173157562600000',
        id: 5
    },

]  

let productsJSON = JSON.stringify(products);

export class container {
    constructor(fileName){
        this.fileName = fileName;
    }
    // Funcion para parsear los array que voy a guardar en mi archivo
    parseJsonArray(json){
        return new Promise(resolve =>{
            resolve(JSON.parse(json));
        })
    }
    // Funcion para crear el archivo, con mi array de productos inical
    async writeFile (){
        try{
            await fs.promises.writeFile(this.fileName,productsJSON);
        }
        catch(error){
            console.log('No se pudo generar el archivo');
        }
    }
    // FUncion para leer y obtener el contenido de mi archivo
    async readFile (){
        try{
            let productsJSON = await fs.promises.readFile(this.fileName, 'utf-8');
            let products = await this.parseJsonArray(productsJSON);
            return products;
        }
        catch(error){
            console.log('No se pudo leer el archivo');
        }
    }
    // Funcion para guardar un nuevo objeto, con nuevo Id y mostrarlo
    async save(object){
        try{
            let productsArray = await this.readFile();
            // Buscando el ultimo ID y generando el Id para el nuevo producto

            let productsArrayLength = productsArray.length;
            let productsLastId = productsArray[(productsArrayLength-1)].id 
            object['id'] = (productsLastId + 1); 
            productsArray.push(object);

            // Guardando el nuevo producto en el archivo
            productsArray = JSON.stringify(productsArray);
            await fs.promises.writeFile(this.fileName, productsArray, 'utf-8');
            return { 
                title: object.title,
                price: object.price,
                thumbnail: object.thumbnail,
                id: object.id
            };
        }
        catch (error){           
            throw new Error('No se pudo agregar el producto');
        }
    };
    // Funcion para obtener un objeto del archivo con su Id
    async getById(number){
        try{
            let productsId = await this.readFile();
            let matchId = productsId.find(product => product.id == number);
            if(matchId === undefined){
                return null;
            }else{ 
                return matchId;
            }
        }
        catch (error){
            throw new Error('No se pude leer el archivo');
        }        
        
    };
    // FUncion para obtener todos los objetos del archivo
    async getAll(){
        try{
            let allProducts= this.readFile();
            return allProducts;
        }
        catch (error){
            throw new Error('No se pude leer el archivo');
        }   
    }
    // Funcion para eliminar un objeto en especifico del archivo segun su Id
    async deleteById(number){
        try{
            let productsId = await this.readFile();
            let matchId = productsId.filter(product => product.id != number);
            console.log(matchId)
            matchId = JSON.stringify(matchId);
            await fs.promises.writeFile(this.fileName, matchId);
            return matchId;
        }
        catch (error){
            throw new Error('No se pude leer el archivo');
        }  
    }
    // Funcion para eleminar todos los objetos del archvio
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.fileName, []);
        }
        catch (error){
            throw new Error('No se pudo eliminar el archivo');
        }
    }
}

let productsArchive = new container("./products.txt")

/*
// Pruebo de generar el archivo con lo que tengo en mi array de productos
productsArchive.writeFile();

// Prueba de leer el archivo con lo que tengo en mi array de productos y mostrarlo
productsArchive.readFile()
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    });

// Prueba de guardar producto nuevo y mostrar por consola su ID
let newProduct = {
    title: 'Lapicera',
    price: 210,
    thumbnail: "https://aldina.com.ar/wp-content/uploads/2020/08/Lapicera-Trazo-Fino-Negra_5e1f7a4ade90f.png",
}
productsArchive.save(newProduct)
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    });

// Prueba de bsucar y mostrar por consola el obejto con el ID pedido
productsArchive.getById(2)
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    })

// Prueba de mostrar todos los objetos por consola
productsArchive.getAll()
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    })

// Prueba de eliminar el producto con el Id solicitado y mostrar por consola que se elimino
productsArchive.deleteById(4)
    .then((result)=>{
        result = JSON.parse(`Array sin el obejto eliminado: ${result}`);
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    })

// Prueba de eliminar todo el archivo
productsArchive.deleteAll();

*/

