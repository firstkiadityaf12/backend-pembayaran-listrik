const express = require("express")
const app = express()

//call model
const models = require("../models/index")
const penggunaan = models.penggunaan

//middleware
app.use(express.urlencoded({extended: true}))
const validateToken = require('./velidateToken')
app.use(validateToken)

//endpoint GET
app.get("/", async (req, res) => {
    //ambil data
    penggunaan.findAll({
        include : [ ,"pelanggan","tagihan","pembayaran"]
    })
    .then(result =>{
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message 
        })
    })
})

//endpoint GET by ID
app.get("/:id_penggunaan", async (req, res) => {
    //ambil data
    //parameter
    let parameter = {id_penggunaan: req.params.id_penggunaan}
    penggunaan.findOne({where: parameter})
    .then(result =>{
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message 
        })
    })
})

//endpoint POST
app.post("/", async (req, res) => {
    let data = {
        id_pelanggan : req.body.id_pelanggan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }
    //create
    penggunaan.create(data)
    .then(result =>{
        res.json({
            message: "data has been inserted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message 
        })
    })
})

//endpoint put
app.put("/", async (req, res) => {
    let parameter = { id_penggunaan: req.body.id_penggunaan }
    let data = {
        id_pelanggan : req.body.id_pelanggan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }
    //update 
    penggunaan.update(data,{where: parameter})
    .then(result =>{
        res.json({
            message: "data has been update",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message 
        })
    })
})

//endpoint delete
app.delete("/:id_penggunaan", async (req, res) => {
    //parameter
    let parameter = { id_penggunaan: req.params.id_penggunaan}
    //hapus data
    penggunaan.destroy({where: parameter})
    .then(result =>{
        res.json({
            message: "data has been Deleted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message 
        })
    })
})


//export module
module.exports = app
