const mongoose = require("mongoose")
const packageSchema = mongoose.Schema({
mode: String,
price: Number,
quantity: Number
})
module.exports = mongoose.model("package", packageSchema)