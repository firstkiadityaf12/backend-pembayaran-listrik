const express = require("express")
const app = express()

//call model
const models = require("../models/index")
const tagihan = models.tagihan
const penggunaan = models.penggunaan

//middleware
app.use(express.urlencoded({extended: true}))

//validate token
const validateToken = require('./velidateToken')
app.use(validateToken)

//endpoint GET
app.get("/", async (req, res) => {
    //ambil data
    tagihan.findAll({
        include : [ "pelanggan","penggunaan","pembayaran"]
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
app.get("/:id_tagihan", async (req, res) => {
    //ambil data
    //parameter
    let parameter = {id_tagihan: req.params.id_tagihan}
    tagihan.findOne({where: parameter})
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
    //param
    let parameter = { id_penggunaan: req.body.id_penggunaan}
    let total = await penggunaan.findOne({where: parameter})
    let totalmeter = total.meter_akhir - total.meter_awal

    let data = {
        id_penggunaan : req.body.id_penggunaan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        jumlah_meter : totalmeter,
        status: req.body.status
    }
    //create
    tagihan.create(data)
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
    let parameter = { id_tagihan: req.body.id_tagihan }
    let data = {
        id_penggunaan : req.body.id_penggunaan,
        bulan : req.body.bulan,
        tahun : req.body.tahun,
        jumlah_meter : req.body.jumlah_meter,
        status: req.body.status
    }
    //update 
    tagihan.update(data,{where: parameter})
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
app.delete("/:id_tagihan", async (req, res) => {
    //parameter
    let parameter = { id_tagihan: req.params.id_tagihan}
    //hapus data
    tagihan.destroy({where: parameter})
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
