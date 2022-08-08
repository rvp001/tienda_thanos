const router = require('express').Router();

const { checkToken } = require('../helpers/middlewares');

const productsRouter = require('./api/products')
router.use('/products', checkToken ,productsRouter)

const usersRouter = require('./api/users')
router.use('/users', usersRouter)

module.exports = router;