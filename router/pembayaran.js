const express = require("express")
const app = express()
//membaca reques dari form data
const multer = require("multer")
//path manage alamt directory file
const path = require("path")
//fs manage file
const fs = require("fs")

//-------------------------------------------
//atur file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./bukti")
    },
    //atur nama file
    filename: (req, file, cb) => {
        cb(null, "bukti-" + Date.now() + path.extname(file.originalname))
    }
})

//upload ke file
const upload = multer({storage: storage})
// -------------------------------------------

//call model
const models = require("../models/index")
const pembayaran = models.pembayaran
const tagihan = models.tagihan

//middleware
app.use(express.urlencoded({extended: true}))

//validatetoken
const validateToken = require('./velidateToken')
app.use(validateToken)

//endpoint GET
app.get("/", async (req, res) => {
    //ambil data
    pembayaran.findAll({
        include : [ ,"pelanggan","penggunaan","tagihan"]
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
app.get("/:id_pembayaran", async (req, res) => {
    //ambil data
    //parameter
    let parameter = {id_pembayaran: req.params.id_pembayaran}
    pembayaran.findOne({where: parameter})
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
app.post("/", upload.single("bukti") ,async (req, res) => {
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran: req.body.tanggal_pembayaran,
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin: req.body.biaya_admin,
        total_bayar: req.body.total_bayar,
        status: req.body.total_bayar,
        id_admin: req.body.id_admin,
        bukti: req.file.filename
    }
    let ditagihan = { id_tagihan: data.id_tagihan}
    let status = {status: 1}
    tagihan.update(status, {where: ditagihan})
    //create
    pembayaran.create(data)
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
app.put("/", upload.single("bukti") ,async (req, res) => {
    let parameter = { id_pembayaran: req.body.id_pembayaran }
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran: req.body.tanggal_pembayaran,
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin: req.body.biaya_admin,
        total_bayar: req.body.total_bayar,
        status: req.body.total_bayar,
        id_admin: req.body.id_admin,
        bukti: req.file.filename
    }
    //hpaus data file lama
    if (req.file) {
        let oldBukti = await pembayaran.findOne({where: parameter})
        let oldBayar = oldBukti.bukti

        //delete old file dari path directory pad file saat ini
        let pathFile = path.join(__dirname,"../bukti", oldBayar)
        //hapus
        fs,unlink(pathFile, error => console.log(error))
        data.bukti = req.file.filename
    }

    //update 
    pembayaran.update(data,{where: parameter})
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
app.delete("/:id_pembayaran", async (req, res) => {
    //parameter
    let parameter = { id_pembayaran: req.params.id_pembayaran}
    
    //data yang akan dihapus 
    let oldBukti = await pembayaran.findOne({where: parameter})
    let oldBayar = oldBukti.bukti

    //hapus
    let pathFile = path.join(__dirname,"../bukti", oldBayar)
    fs.unlink(pathFile, err => console.log(err))
    
    //hapus data
    pembayaran.destroy({where: parameter})
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
