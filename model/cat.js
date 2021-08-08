const mongoose = require("mongoose")
const Product = mongoose.Schema
const ProductSchema = new Product({
    category: String
})

const model = mongoose.model("category", ProductSchema)

module.exports = model