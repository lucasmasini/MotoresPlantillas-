import express from 'express';
import routerProducts from './routes/apiProducts.js'

const app = express();
const PORT = 8081;

//Declarando los motoses de plantilla y rutas de acceso a los archivos
app.set('view engine', 'pug');
app.set('views','./views');

// Declarando los routes
app.use('/productos', routerProducts);

// Ruta Primaria, desde donde se puede acceder a cualquier accion
app.get('/',(req,res)=>{
    res.render('root',{})
})


//Iniciando el servidor
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`);
})