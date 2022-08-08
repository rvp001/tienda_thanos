const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "El campo username es requerido"],
        minLength: [3, "El campo username debe tener como minimo 3 caracteres"],
        maxLength: [10, "El campo username debe tener como maximo 10 caracteres"]

    },
    email: {
        type: String,
        match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: String,
    active: Boolean,
    role: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }]
});
// en la referencia se pone el nombre que hayamos puesto en el product.model, que se mete en el mongoose.model
module.exports = mongoose.model('user', userSchema);