import express from 'express';
import routerProducts from './routes/apiProducts.js'
import { engine } from 'express-handlebars';

const app = express();
const PORT = 8080;

//Declarando los motoses de plantilla y rutas de acceso a los archivos
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views','./views');

// Declarando los routes
app.use('/productos', routerProducts);



//Iniciando el servidor
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`);
})