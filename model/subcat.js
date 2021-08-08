const mongoose = require("mongoose")
const Product = mongoose.Schema
const ProductSchema = new Product({
    subcategory: String
})

const model = mongoose.model("subcategory", ProductSchema)

module.exports = model