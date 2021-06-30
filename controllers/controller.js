const Model = require('../models/model')

const bcrypt = require("bcrypt")

const method = async () => {
    try { 
        return { status: true, result: {} }
    }
    catch (e) {
        return { status: false, result: { message: e.message } }
    }
}

// user with hash password
const user = async (user) => {
    let emailRegex = /.+@.+[.].+/
    // check for other parts

    // make hash
    let hash = await bcrypt.hash(password, 10)

    // check password
    await bcrypt.compare(password, hash)
}

module.export = { method }