const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const jwt = require("jsonwebtoken")

const router = require("./routes/router")

const app = express()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongoose connected"))

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded())

const verifyToken = (req, res) => {
    let header = req.headers["authorization"]
    if (!header) {
        res.status(403).json({ message: "No authorization header" })
    }
    else {
        let access_token = header.split(" ")[1]
        try {
            jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
            next()
        }
        catch (e) {
            res.status(403).json({ message: "Invalid access token" })
        }
    }
}

app.use('/router', router)

app.get('/', (req, res) => res.send("Welcome"))

const PORT = 3333
app.listen(PORT, () => console.log("Server listening at port" + PORT))

module.exports = app