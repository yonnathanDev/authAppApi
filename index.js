const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./db/config');
require('dotenv').config();


//Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

// Directorio Publico
app.use( express.static('public') );

//CORS
// app.use( cors() );

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', cors(corsOptions),require('./routes/auth') );

// Manejar demás rutas
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html') );
})


app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
})