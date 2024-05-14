const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { createPool } = require("mysql");
const bcryptjs = require("bcryptjs");
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;


// .ENV CONFIGURACION
dotenv.config({
    path:"./env/.env"
});

// USOS
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/router'));
//app.use(express.json());

// INICIALIZACIÓN DE APP
app.listen(PORT, () => console.log(`funcionando en: http://localhost:${PORT}`));