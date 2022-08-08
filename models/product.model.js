// Cada coleccion(tabla) va a tener un squema en mongo
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// hay que poner los tipos especificos de mongoose, String con mayuscula, Number, Buffer, ObjectId, Array, Date, Boolean...
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    created_at: Date
})

// el primer nombre es el nombre que va a aparecer en compas de mongo, pero lo pone en plural y este ta,bien es el que se pone en la referencia de user, y el segundo nombre es el squema, 
module.exports= mongoose.model('product', productSchema)