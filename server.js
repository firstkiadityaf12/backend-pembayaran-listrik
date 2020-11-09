const express = require("express")
const app = express()

//import modul
const tarif = require("./router/tarif")
const tagihan = require("./router/tagihan")
const penggunaan = require("./router/penggunaan")
const pembayaran = require("./router/pembayaran")
const pelanggan = require("./router/pelanggan")
const admin = require("./router/admin")

//auth
const auth = require("./router/auth")

//use modul
app.use("/tarif", tarif)
app.use("/tagihan", tagihan)
app.use("/penggunaan", penggunaan)
app.use("/pembayaran", pembayaran)
app.use("/pelanggan", pelanggan)
app.use("/admin", admin)
app.use("/auth", auth)

//runnserver
app.listen(1080, () => {
    console.log("Run server on port 1080")
})

