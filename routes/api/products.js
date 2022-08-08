const router = require('express').Router();
const {checkSchema} = require('express-validator');

const Product = require('../../models/product.model');
const User = require('../../models/user.model');
const createProductValidator= require('../../validators/createProduct.validator');
const {checkValidationErrors} = require('../../helpers/middlewares')


router.get('/', async (req, res)=>{
    try{
        const products = await Product.find() 
        res.json(products)

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get('/cart', async (req, res) => {
    // recuperar los productos del usuario logado
    const user = await User
        .findById(req.user._id)
        .populate('products');
    res.json(user.products)
})

router.get('/add/:productId', async (req, res) => {
    const { productId } = req.params;
    req.user.products.push(productId);
    // para guardar en la base de datos
    await req.user.save()

    res.json({success: "Producto agregado"})
})

// Validaciones en el POST
router.post('/', 
        checkSchema(createProductValidator), 
        checkValidationErrors,
        async(req,res)=>{

    // Comprobar los errores de la validacion en checkErrors en middlewawres
    try {
        const producto = await Product.create(req.body)
        res.status(201).json(producto)        
    } catch (err) {
        res.status(500).json({error: err.message})        
    }
})

router.put('/:productId', async(req,res)=>{
    try {
        const productUpdate = await Product.findByIdAndUpdate(req.params.productId, req.body,{new: true} )
        res.json(productUpdate)        
    } catch (err) {
        res.status(500).json({error: err.message})        
    }
})

router.delete('/:productId', async (req, res)=>{
    try {
        // el findByIdAndRemove no devuelve nada?
        const productDelete = await Product.findByIdAndDelete(req.params.productId)
        res.json(productDelete)
        
    } catch (err) {
        res.status(500).json({error: err.message})                       
    }
})

module.exports = router;