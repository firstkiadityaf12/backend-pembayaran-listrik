const express = require("express")
const app = express()

//call model
const models = require("../models/index")
const tarif = models.tarif

//middleware
app.use(express.urlencoded({extended: true}))

//verify token
const validateToken = require('./velidateToken')
app.use(validateToken)

//endpoint
app.get("/", async (req, res) => {
    //ambil data
    tarif.findAll()
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

//endpoint post
app.post("/", async (req, res) => {
    let data = {
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }
    //create
    tarif.create(data)
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
    let parameter = { id_tarif: req.body.id_tarif }
    let data = {
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }
    //update 
    tarif.update(data,{where: parameter})
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
app.delete("/:id_tarif", async (req, res) => {
    //parameter
    let parameter = { id_tarif: req.params.id_tarif}
    //hapus data
    tarif.destroy({where: parameter})
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


//export
module.exports = app
