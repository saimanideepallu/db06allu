const mongoose = require("mongoose")
const packageSchema = mongoose.Schema({
mode: String,
price: {
    type:Number,
    min:10,
    max:500
},
quantity: {
    type:Number,
    min:5,
    max:1000
}
})
module.exports = mongoose.model("package", packageSchema)