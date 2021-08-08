const express = require("express")
const app = express()
const PORT = 3003 || process.env.PORT
const url = "mongodb+srv://admin:I@mgreat7@elefaddb.riaeu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoose = require("mongoose")
const product = require("./model/product")
const bodyParser = require("body-parser")
const cors = require("cors")
const category = require("./model/cat")
const top = require("./model/top")
const best = require("./model/best")
const newS = require("./model/new")
const FlashSale = require("./model/flash")
const subcategory = require("./model/subcat")
const { v4: uuidv4 } = require("uuid")
const fileUpload = require('express-fileupload');
const path = require("path")

app.use(bodyParser({extended: true}))
app.use(bodyParser.json())
app.use(cors({
    origin: "*"
}))
app.use(fileUpload());
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "media")))

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    app.listen(PORT, () => {
        console.log(`Server Fired up on port ${PORT}`);
    })
})

app.get("/", (req, res) => {
    const NewProduct = new product({
        product_name: "test",
        product_imgs: "https://images.google.com/randomString",
        product_des: "A test Product really great for testing Websites specifically for ecommerce once",
        price: "$6000",
        sprice: "$9000",
        size: "S M L XL XXL",
        color: "red blue green",
        stock: "15",
        category: "Men Women Kids",
        subCategory: "none",
        tag: "String"
    })
    // console.log(NewProduct);
    // NewProduct.save()
    res.send("Index Page")
})


app.get('/postcategory', (req, res) => {
    res.render('index')
    // res.send('hmm')
})

app.post('/postcategory', (req, res) => {
    const newCategory = new category({
        category: req.body.cat
    })
    newCategory.save()
    res.send(req.body.cat)
})

app.get('/postsubcategory', (req, res) => {
    res.render('index')
    // res.send('hmm')
})

app.post('/postsubcategory', (req, res) => {
    const newCategory = new subcategory({
        subcategory: req.body.cat
    })
    newCategory.save()
    res.send(req.body.cat)
})

app.get('/api/categories', (req, res) => {
    category.find({}, (error, cat) => {
        if(!error){
            // console.log(cat);
            res.send(cat)
        }
    })
})

app.get('/api/subcategory', (req, res) => {
    subcategory.find({}, (error, cat) => {
        if(!error){
            // console.log(cat);
            res.send(cat)
        }
    })
})


app.get("/getsampleproduct", (req, res) => {
    const ProtoProduct = {
		
	}
    const TestP = new product({description: "Sporty Outfit for athelits and some other shit to fill the description",
    gallery: [
        {
            id: 0,
            original: "/assets/images/products/p-20-1.png",
            thumbnail: "/assets/images/products/p-20-1.png"
        },
        {
            id: 1,
            original: "/assets/images/products/p-20-2.png",
            thumbnail: "/assets/images/products/p-20-2.png"
        }
    ],
    image: {
        id: 10,
        original: "/assets/images/products/p-20-m.png",
        thumbnail: "/assets/images/products/p-20-m.png"
    },
    name: "Test Athelite Dress for Kids",
    price: 99,
    sale_price: 69,
    slug: "Test Athelite Dress for Kids",
    variations: [
        {
            id: 56,
            value: "S",
            attribute: {
                id: 56,
                name: "Size",
                slug: "size"
            }
        },
        {
            id: 160,
            value: "M",
            attribute: {
                id: 56,
                name: "length",
                slug: "length"
            }
        }
    ],
    stock: 15})
    TestP.save()
    res.send(TestP)
})

app.get("/gettopproducts", (req, res) => {
    product.find({}, (error, products) => {
        // res.send(products)
        const topProducts = []
        products.forEach(pro => {
            if(pro.place === "Top"){
                topProducts.push(pro)
            }
        })
        res.send(topProducts)
    })
})

app.get("/postnewproduct", (req, res) => {
    res.render('product.ejs')
})

// app.post("/postnewproduct", (req, res) => {
//     // const vari = req.body.variation.split(" ")
//     // console.log(vari);
//     // const unit = vari[0]
//     // const variants = []
//     // for(var i=1;i<vari.length-1;i++){
//     //     console.log(vari[i]);
//     //     const one = {}
//     //     one.id = uuidv4()
//     //     one.value = vari[i]
//     //     one.attribute={
//     //         id: one.id,
//     //         name: unit,
//     //         slug: unit
//     //     }
//     //     variants.push(one)
//     // }
//     // // console.log(variants);
//     // const gal = req.body.gallery.split(" ")
//     // // console.log(gal);
//     // const galler = []
//     // gal.forEach(pic => {
//     //     const two = {}
//     //     two.id=uuidv4()
//     //     two.original = pic
//     //     two.thumbnail = pic
//     //     galler.push(two)
//     // })
//     // const img = {
//     //     id: uuidv4(),
//     //     thumbnail: req.body.image,
//     //     original: req.body.image
//     // }
//     // console.log(galler);
//     // const regisPro = new product({
//     //     name: req.body.name,
//     //     description: req.body.description,
//     //     gallery: galler,
//     //     id: uuidv4(),
//     //     image: img,
//     //     price: req.body.price,
//     //     sale_price: req.body.sale_price,
//     //     slug: req.body.slug,
//     //     variations: variants,
//     //     stock: 15,
//     //     sku: "sku",
//     //     category: "Men",
//     //     subCategory: "Western",
//     //     tags: "Western Tux"
//     // })
//     // regisPro.save()
//     // console.log(regisPro);
//     // console.log(variants);
//     // console.log("this hit");
//     console.log(req.body);
//     console.log(req.files);
//     if(req.files){
//         console.log(req.body.files);
//         console.log("got files here");
//     }
//     res.send(req.files)
// })

app.get("/getbestproducts", (req, res) => {
    product.find({}, (error, products) => {
        // res.send(products)
        const topProducts = []
        products.forEach(pro => {
            if(pro.place === "Best"){
                topProducts.push(pro)
            }
        })
        res.send(topProducts)
    })
})

app.get("/getnewproducts", (req, res) => {
    product.find({}, (error, products) => {
        // res.send(products)
        const topProducts = []
        products.forEach(pro => {
            if(pro.place === "New"){
                topProducts.push(pro)
            }
        })
        res.send(topProducts)
    })
})

app.get("/front", (req, res) => {
    res.render("front")
})

app.post("/front", (req, res) => {
    res.send(req.body)
})

app.get("/top", (req, res) => {
    top.find({}, (error, data) => {
        res.send(data)
    })
})

app.get("/delete", (req, res) => {
    top.deleteOne({}, (err, obj) => {
        console.log("deleted");
        res.send("delete")
    })
})

app.post("/api/top", (req, res) => {
    const newTop = new top({
        topProducts: req.body.checkedProduct
    })
    newTop.save()
    console.log(req.body);
    res.send("new top")
})

app.get("/api/products", (req, res) => {
    product.find({}, (error, data) => {
        res.send(data)
    })
})
app.get("/best", (req, res) => {
    best.find({}, (error, data) => {
        res.send(data)
    })
    // const ne = new best({
    //     topProducts: "a"
    // })
    // ne.save()
    // res.send("saved")
})

app.get("/deletebest", (req, res) => {
    best.deleteOne({}, (err, obj) => {
        console.log("deleted");
        res.send("delete")
    })
})

app.post("/api/best", (req, res) => {
    const newTop = new best({
        topProducts: req.body.checkedProduct
    })
    newTop.save()
    console.log(req.body);
    res.send("new best")
})

app.get("/new", (req, res) => {
    newS.find({}, (error, data) => {
        res.send(data)
    })
    // const ne = new newS({
    //     topProducts: "a"
    // })
    // ne.save()
    // res.send("saved")
})

app.get("/deletenew", (req, res) => {
    newS.deleteOne({}, (err, obj) => {
        console.log("deleted");
        res.send("delete")
    })
})

app.post("/api/new", (req, res) => {
    const newTop = new newS({
        topProducts: req.body.checkedProduct
    })
    newTop.save()
    console.log(req.body);
    res.send("new best")
})

app.get("/flash", (req, res) => {
    FlashSale.find({}, (error, data) => {
        res.send(data)
    })
    // const ne = new FlashSale({
    //     topProducts: "a"
    // })
    // ne.save()
    // res.send("saved")
})

app.get("/deleteflash", (req, res) => {
    FlashSale.deleteOne({}, (err, obj) => {
        console.log("deleted");
        res.send("delete")
    })
})

app.post("/api/flash", (req, res) => {
    const newTop = new FlashSale({
        topProducts: req.body.checkedProduct
    })
    newTop.save()
    console.log(req.body);
    res.send("new best")
})


app.post('/upload', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    console.log(req.body);
    const galler = []
    // const file = req.files.file;
    for(var file in req.files){
        if(file === "thumbnail"){

        }else{

            galler.push(file)
        }
        req.files[file].mv(`${__dirname}/media/${req.files[file].name}`, err => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
      
        //   res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
        });
    }
    const vari = req.body.variation.split(" ")
    const unit = vari[0]
    const variants = []
    for(var i=1;i<vari.length-1;i++){
        console.log(vari[i]);
        const one = {}
        one.id = uuidv4()
        one.value = vari[i]
        one.attribute = {
            id: one.id,
            name: unit,
            slug: unit
        }
        variants.push(one)
    }
    // console.log(variants);
    const image = req.files["thumbnail"].name

    console.log(galler);
    const gal = []
    galler.forEach(pic => {
        const two = {}
        two.id = uuidv4()
        two.original = `http://localhost:3003/${pic}`
        two.thumbnail = `http://localhost:3003/${pic}`
        gal.push(two)
    })
    console.log(gal);

    const img = {
        id: uuidv4(),
        thumbnail: `http://localhost:3003/${image}`,
        original: `http://localhost:3003/${image}`
    }

    const productRegist = new product({
        name: req.body.name,
        description: req.body.des,
        gallery: gal,
        id: uuidv4(),
        image: img,
        price: req.body.price,
        sale_price: req.body.sprice,
        slug: req.body.slug,
        variations: variants,
        stock: req.body.stock,
        sku: req.body.sku,
        category: req.body.category,
        subCategory: req.body.subCategory,
        tags: req.body.tags
    })
    productRegist.save()
});