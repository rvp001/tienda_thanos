# Creacion del CRUD de Productos

- GET /api/products
  Recuperar tods los productos
  PRUEBAS:

  - Que el status de la respuesta sea 200
  - Que el contenido de la respuesta es en formato JSON
  - Que la respuesta sea un array
  - Que los productos devueltos son un numero concreto

- POST /api/products
  Crear un unico producto

- PUT /api/products/IDPRODUCT
  Actualiza un producto a partir de su ID

- DELETE /api/products/IDPRODUCT
  Borra un producto a partir de su ID

## Prueba de PUT /api/products/IDPRODUCTO

- Probamos el status (200) y el content-type -> Crear la peticion en la app
- Antes de cada prueba, generamos un objeto en la base de datos (findByIdAndDelete)
- Despues de cada prueba lo borramos
- Antes de cada prueba lanzamos la peticion de la actualizacion (PUT /api/products/IDPRODUCTO ) -> Supertest
- En la actualizacion modificamos price y department -> BODY
- En la ultima prueba confirmamos si el valor del price y del department que estamos pasando son los que nos devuelve la ejecucion

## PRUEBA DELETE /api/products/IDPRODUCTO

- Antes de cada prueba crear un nuevo producto
- Antes de cada prueba lanzamos la peticion
- Probamos:
  - Status y content-type
  - Comprobar en la base de datos si el producto que he creado esta o no. (findById)

## POST con validaciones

- Si paso un objeto sin name, me devuelve error
- Si paso un objeto con name de menos de 3 caracteres, error
- Si paso available a false, error

## USUARIOS

- Modelo: User -> username, email, password, active (Boolean), role
- RUTA:
  - /api/users/register
    - Recibe a traves del body los datos traves de un user y lo inserta en la BBDD.

## Agregar idProducto

GET /products/add/IDPRODUCTO

- Agrega al usuario que ha hecho login ese producto en concreto

GET /products/cart

- Recupera los productos del usuario logado

GET /users/profile

- Recupera el perfil completo del usuario logado. Productos incluidos
