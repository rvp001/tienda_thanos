const router = require('express').Router();
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/utils');
const {checkToken} = require('../../helpers/middlewares')

router.get('/profile', checkToken, async (req, res) => {
    const user = await User.findById(req.user._id).populate('products')
    res.json(user)
})

router.post('/register', async (req, res) => {
    try {
        req.body.password= bcrypt.hashSync(req.body.password, 11)

        const response = await User.create(req.body)
        console.log(response)
        res.json(response)
        
    }catch(err) {res.status(500).json({error: err.message})}
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Existe email en la BBDD?
        const user = await User.findOne({email})
        if (!user) return res.status(401).json({ error: "Error en email y/o contraseña" })
        
        // Coinciden  las password?
        const iguales = bcrypt.compareSync(password, user.password)
        if (!iguales) return res.status(401).json({ error: "Error en email y/o contraseña" })
        
        
        res.json({
            success: "Login correcto",
            token: createToken(user)
        })
        
    } catch (err) {
        res.status(500).json({error: err.message})        
    }
})


module.exports = router;