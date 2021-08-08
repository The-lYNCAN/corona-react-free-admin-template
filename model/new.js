const mongoose = require("mongoose")
const Product = mongoose.Schema
const ProductSchema = new Product({
    topProducts: Array
})

const model = mongoose.model("new-products", ProductSchema)

module.exports = model