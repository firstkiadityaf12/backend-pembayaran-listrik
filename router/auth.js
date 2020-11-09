const express = require("express")
const app = express()
const md5 = require("md5")
const jwt = require("jsonwebtoken")// npm install jsonwebtoken
const SECRET_KEY = "mokletmalang"

//call model
const models = require("../models/index")
const pelanggan = models.pelanggan
const admin = models.admin
const level = models.level
// middleware req body 
app.use(express.urlencoded({ extended:true }))
//akses lewat body
app.post("/", async (req, res) => {
    //tampung 
    let parameter = {
        username : req.body.username,
        password : md5(req.body.password)
    }

    //cek data pada tabel admin
    let result = await admin.findOne({where: parameter})
    if (result) {
        //jika tersapat data sesuai username dan password
        let payload = JSON.stringify(result)
        //payload adalah data yng dienkripsi menggunakan jwt
        return res.json({
            data:result,
            token: jwt.sign({level:'nama_level'}, SECRET_KEY)
        })
    }
    return res.json({
        message: "Invalid username or password"
    })
})

//export app
module.exports = app
