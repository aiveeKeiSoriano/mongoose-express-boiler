const express = require("express")

const controller = require("../controllers/controller")

const router = express.Router()

//simple request
router.get("/", async (req, res) => {
    let result = await controller.method()
    if (result.status) {
        res.status(200).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

//auth request making token
router.post('/login', async (req, res) => {
    let result = await controller.method()
    if (result.status) {
        let payload = {
            //some stuff
        }
        let access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
        let resfresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
        await controller.method() //add refresh token to database
        res.status(200).json({access_token, resfresh_token})
    }
    else {
        res.status(401).send(result.result)
    }
})

//get new access token
router.post('/token', async (req, res) => {
    let { refresh_token } = req.body
    try {
        let user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        let payload = {
            //some stuff from user
        }
        let access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
        res.status(200).json({access_token})
    }
    catch (e) {
        res.status(403).json({ message: "Invalid refresh token" })
    }
})

module.exports = router