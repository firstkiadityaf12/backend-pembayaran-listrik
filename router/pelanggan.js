const express = require("express")
const app = express()
const md5 = require("md5")

//call models
const models = require('../models/index')
const pelanggan = models.pelanggan

//middleware 
app.use(express.urlencoded({extended: true}))

//validate token
const validateToken = require('./velidateToken')

//endpoint get
app.get("/", validateToken ,async (req, res) => {
    //ambil data
    pelanggan.findAll({
        include : [
            "pembayaran"
        ]
    })
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
})

//endpoint post
app.post("/", async (req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.pelanggan,
        alamat : req.body.alamat,
        id_tarif: req.body.id_tarif
    }
    //create
    pelanggan.create(data)
    .then(result => {
        res.json({
            message: "data has inserted",
            data: result
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
})

//endpoit post pembayaran

//endpoint put
app.put("/", validateToken,async (req, res) => {
    let parameter = { id_pelanggan: req.body.id_pelanggan}
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.pelanggan,
        alamat : req.body.alamat,
        id_tarif: req.body.id_tarif
    }
    //update
    pelanggan.update(data,{where: parameter})
    .then(result => {
        res.json({
            message: "data has been update",
            data: result
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
})

//endpoint delete
app.delete("/:id_pelanggan", validateToken,async (req, res) => {
    let parameter = {id_pelanggan: req.params.id_pelanggan}
    pelanggan.destroy({where: parameter})
    .then(result => {
        res.json({
            message: "data has been Deleted",
            data: result
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
})

//export module
module.exports = app
