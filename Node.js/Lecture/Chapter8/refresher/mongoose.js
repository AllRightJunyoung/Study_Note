const mongoose=require('mongoose')
const Product=require('./models/product')
const url=`mongodb+srv://moon2421:a21524679@cluster0.1zxdjlp.mongodb.net/product?retryWrites=true&w=majority`

mongoose.connect(url).then(()=>{
    console.log('Connected to database!')
}).catch(()=>{
    console.log('Connetion faild!')
})

const createProduct=async (req,res,next)=>{
    const createdProduct=new Product({
        name:req.body.name,
        price:req.body.price
    })
    const result=await createdProduct.save()
    res.json(result)
}
const getProducts=async (req,res,next)=>{
    const products=await Product.find().exec()
    res.json(products)
}
exports.createProduct=createProduct
exports.getProducts=getProducts