const mongoose  = require('mongoose');
const request= require('supertest')
const app = require('../../app');
const Product = require('../../models/product.model')

describe('Pruebas sobre la api de productos', ()=>{

    beforeAll( async ()=>{
        await mongoose.connect('mongodb://127.0.0.1/tienda-online')
    })

    afterAll( async ()=>{
        await mongoose.disconnect()
    })

    describe('GET /api/products', ()=>{

        let response;
        beforeAll(async()=>{
            response = await request(app).get('/api/products').send();
        })
        // beforeEach
        // afterAll
        // afterEach

        it('Deberia devolver status 200', ()=>{
            expect(response.statusCode).toBe(200);
        });
        
        it('Deberia devolverme la respuesta en formato JSON', ()=>{
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('Deberia devolverme un Array', ()=>{
            expect(response.body).toBeInstanceOf(Array)
        })

    });

    describe('POST /api/products', ()=>{
        
        let response;
        const newProduct={name: 'Picadora Moulinex', description: 'Para picar cosas', price: 23, department: 'test', available: true, created_at: new Date()};
        beforeEach(async()=>{
            response = await request(app).post('/api/products').send(newProduct);
        })

        afterAll(async()=>{
            // await Product.deleteMany({department: {$ne:"moda"}})
            await Product.deleteMany({department: "test"})
        })
        
        it('deberia devolver un status 201', ()=>{
            expect(response.statusCode).toBe(201);
        })

        it('deberia devolver la respuesta en formato JSON', ()=>{
            expect(response.headers['content-type']).toContain('application/json')
        })

        // Si el _id viene definido
        // Si alguno de los datos que estamos insertando nos es devuelto en la respuesta
        it('deberia inserta el producto en la BBDD',()=>{
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newProduct.name)
        })
    });

    // POST con VALIDACIONES, con squema-validator de express
    describe('POST con validaciones /api/products', ()=>{

        afterAll(async () => {
            await Product.deleteMany({department:"test"})
        })
        
        it('deberia devolver error si no recibe name', async () => {
            const response = await request(app).post('/api/products').send({
                description:"lo que sea", price: 123,department:"test", available: true, created_at:'2022-09-10'
            });
            expect(response.body.name).toBeDefined()
            expect(response.body.name.msg).toBe("El campo nombre es requerido")
           
        })
        
        it('deberia devolver error si es menor a 3 caracteres', async () => {
            const response = await request(app).post('/api/products').send({
                name:"ho",description:"lo que sea", price: 123,department:"test", available: true, created_at:'2022-09-10'
            });
            expect(response.body.name).toBeDefined()
            expect(response.body.name.msg).toBe("El campo tiene que tener mas de 3 caracteres")
           
        })
        
        it('deberia devolver error si no esta disponible el prodcto', async () => {
            const response = await request(app).post('/api/products').send({
                name:"hola",description:"lo que sea", price: 123,department:"test", available: false, created_at:'2022-09-10'
            });
            expect(response.body.available).toBeDefined()
            expect(response.body.available.msg).toBe("Todas las insercciones deben estar disponibles en true")
           
       })
    });


    // describe('PUT /api/products/:productId', ()=>{
    //     let product;
    //     let response;
    //     const newProduct={name: 'Picadora Moulinex', description: 'Para picar cosas', price: 23, department: 'test', available: true, created_at: new Date()};
    //     const productUpdate= {
    //         price: 100,
    //         department: "unico"
    //     }
    //     beforeEach(async()=>{
    //         product = await Product.create(newProduct)
    //         response = await request(app).put('/api/products/' + product._id).send(productUpdate);
    //     })

    //     afterEach(async()=>{
    //         // await Product.deleteMany({department: {$ne:"moda"}})
    //         await Product.findByIdAndDelete(product._id)
    //     })

    //     it('deberia devolver un status 200', ()=>{
    //         expect(response.statusCode).toBe(200);
    //     })

    //     it('deberia devolver la respuesta en formato JSON', ()=>{
    //         expect(response.headers['content-type']).toContain('application/json')
    //     })

    //     it('deberia devolver los campos price y departement', ()=>{
    //         expect(response.body.price).toBe(100);
    //         expect(response.body.department).toBe("unico");
    //     })
    // })

    // describe('DELETE /api/products/:productId', ()=>{
    //     let product;
    //     let response;
    //     const newProduct={name: 'Picadora Moulinex', description: 'Para picar cosas', price: 23, department: 'test', available: true, created_at: new Date()};
      
    //     beforeEach(async()=>{
    //         product = await Product.create(newProduct)
    //         response = await request(app).delete('/api/products/' + product._id).send();
    //     })

    //     afterEach(async()=>{
    //         // await Product.deleteMany({department: {$ne:"moda"}})
    //         await Product.findByIdAndDelete(product._id)
    //     })

    //     it('deberia devolver un status 200', ()=>{
    //         expect(response.statusCode).toBe(200);
    //     })

    //     it('deberia devolver la respuesta en formato JSON', ()=>{
    //         expect(response.headers['content-type']).toContain('application/json')
    //     })

    //     it('deberia devolver null', async ()=>{
    //         const miProduct1 = await Product.findById(product._id)
    //         expect(miProduct1).toBeNull();
    //         const miProduct = await Product.findById(response.body._id)
    //         expect(miProduct).toBeNull();
    //     })
    // })


});