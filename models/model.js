const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    property: {
        type: String,
        required: true,
        unique: true
    },
    property2: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Model"
    }
}, { timestamps: true })

const Model = new mongoose.model("Name", Schema)

module.exports = Model