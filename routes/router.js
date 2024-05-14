const express = require('express');
const { createconnection } = require('mysql');
const connection = require('../database/database')

const router = express.Router();

// RUTA BASE
router.get('/', (req, res) => {
    res.redirect('/api/producto');
})

// RUTAS DE PRODUCTO
router.get("/api/producto", (req, res) => {
    connection.query(`SELECT * FROM producto`, (err, result, fields) => {
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

router.post("/api/producto", (req, res) => {
    if (req.body._method == "POST") {
        const productoNombre = req.body.nombre;
        const productoDescripción = req.body.descripción;
        const productoPeso = req.body.peso;
        const productoPrecio = req.body.precio;
        const date = new Date();

        connection.query(
            `INSERT INTO producto VALUES (null, ${connection.escape(productoNombre)}, ${connection.escape(productoDescripción)}, ${connection.escape(productoPeso)}, ${connection.escape(productoPrecio)}, ${connection.escape(date.toISOString().slice(0, 19).replace('T', ' '))})`, (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }
                res.status(201).send({
                    "result": "Producto creado exitosamente"
                });
            });
    }
})

// RUTAS DE INVENTARIO
router.get("/api/inventario", (req, res) => {
    connection.query(`SELECT * FROM inventario`, (err, result, fields) => {
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

module.exports = router;