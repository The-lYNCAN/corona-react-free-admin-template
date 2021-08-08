const mongoose = require("mongoose")
const Product = mongoose.Schema
const ProductSchema = new Product({
    description: String,
    gallery: Array,
    image: {type: "Object", "default": {}},
    name: String,
    price: Number,
    sale_price: Number,
    slug: String,
    variations: Array,
    stock: Number,
    sku: String,
    category: String,
    subCategory: String,
    tags: String
})

const model = mongoose.model("product", ProductSchema)

module.exports = model