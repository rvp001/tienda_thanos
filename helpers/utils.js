const jwt = require('jsonwebtoken');

createToken = (user) => {
    const payload = {
        user_id: user._id,
        role: user.role
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}


module.exports = {
    createToken,
}