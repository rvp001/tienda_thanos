const mongoose = require('mongoose');

const Product = require('./models/product.model');

(async ()=>{
    await mongoose.connect('mongodb://127.0.0.1/tienda-online');
    // await Product.deleteMany({});

    // Crear un prducto
    await Product.create({
        name: "Amarillo",
        description: "Pinta cosas rojas",
        price: 14,
        department: "moda",
        available: false,
        created_at: new Date()
    })
    await Product.create({
        name: "Rojo",
        description: "Pinta cosas rojas",
        price: 34,
        department: "moda",
        available: false,
        created_at: new Date()
    })
    await Product.create({
        name: "Azul",
        description: "Pinta cosas rojas",
        price: 24,
        department: "moda",
        available: false,
        created_at: new Date()
    })

    // Actualizar elementos
    // await Product.save()

    // Recuperar documentos
    const products = await Product.find();
    // console.log(products.map(p=>p.name))

    const productsModa = await Product.find({
        departmnet: 'moda',
        available: false
    }).select({name: 1, _id: 0})
    // console.log(productsModa)

    const productsPrecio = await Product.find({
        price: {$gt: 10}  // $gte( este seria mayor o igual que), $lt( este seria solo menor que), $lte, $in (si el valor esta dentro de un array), $nin (si no esta), $ne (que no sea igual a ese)
    })
    // console.log(productsPrecio)

    // Uno u otro
    const options ={
        $or: [   //$and
            {available: true},
            {price: {$lt: 30}}
        ]
    }
    options.$or.push({name: 'Lapiz rojo'})
    const PrecioOr = await Product.find(options)

    

   
    await mongoose.disconnect();
})();


