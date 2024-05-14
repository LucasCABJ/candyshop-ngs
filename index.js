const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { createPool } = require("mysql");
const app = express();
const PORT = 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "ngs_kiosko",
    connectionLimit: 10
});

app.listen(PORT, () => console.log(`funcionando en: http://localhost:${PORT}`));

app.get("/api/producto", (req, res) => {
    pool.query(`SELECT * FROM producto`, (err, result, fields) => {
        if (err) {
            res.status(500).send({
                "error": err
            })
        }
        return res.status(200).send({
            result: result
        })
    })
});

app.post("/api/producto", (req, res) => {
    if (req.body._method == "POST") {
        const productoNombre = req.body.nombre;
        const productoDescripción = req.body.descripción;
        const productoPeso = req.body.peso;
        const productoPrecio = req.body.precio;
        const date = new Date();
        
        try {
            pool.query(
                `INSERT INTO producto VALUES (null, ${pool.escape(productoNombre)}, ${pool.escape(productoDescripción)}, ${pool.escape(productoPeso)}, ${pool.escape(productoPrecio)}, ${pool.escape(date.toISOString().slice(0, 19).replace('T', ' '))})`, (err, result, fields) => {
                    if (err) {
                        res.status(501).json(err);
                    }
                    res.status(201).send({
                        "result": "producto creado exitosamente"
                    });
                });
        } catch (err) {
            console.log("Error occured at POST| /api/producto");
        }

    }
})

app.get("/api/inventario", (req, res) => {
    pool.query(`SELECT * FROM inventario`, (err, result, fields) => {
        if (err) {
            res.status(500).send({
                "error": err
            })
        }
        return res.status(200).send({
            result
        })
    })
});
