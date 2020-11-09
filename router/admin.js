const express = require("express")
const app = express()
const md5 = require("md5")

//call model
const models = require("../models/index")
const admin = models.admin

// middleware req body 
app.use(express.urlencoded({ extended:true }))

//verifytoken
const validateToken = require('./velidateToken')

app.get("/", validateToken ,async (req, res) => {
    //ambil data
    admin.findAll({
        include : [
            "level"
        ]
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

//endpoint post
app.post("/", async (req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }
    //insert data
    admin.create(data)
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
app.put("/", validateToken, async (req, res) => {
    //update data
    let parameter = { id_admin: req.body.id_admin }
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }
    //update data
    admin.update(data, {where: parameter})
    .then(result =>{
        res.json({
            message: "data has been Update",
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
app.delete("/:id_admin", validateToken, async (req, res) => {
    let parameter = { id_admin : req.params.id_admin }
    admin.destroy({where: parameter})
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