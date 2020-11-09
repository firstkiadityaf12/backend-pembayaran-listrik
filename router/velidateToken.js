const jwt = require("jsonwebtoken")
const SECRET_KEY = "mokletmalang"

//validate akun
validateToken = ( req, res, next) => {
    //ambil data token dari header
    let header = req.headers.authorization

    //bearer token untuk mendapatkan kode saja maka perlu split to string
    let token = header ? header.split(" ")[1] : null

    // atur jwt header untuk algoritma encrypt
    let jwtHeader = { algorithm : "HS256"}
    if ( token == null) {
        //maka tidak terkonfirmasi
        return res.json({ message: "Unauthorized"})
    } else {
        //proses verifikas
        jwt.verify(token, SECRET_KEY, jwtHeader, (error, user) => {
            if (error) {
                //jika kode salah
                return res.json({ message: "Invalid token"})
            } else {
                //jika kode benar
                next()
            }
        })
    }
}

//export
module.exports = validateToken