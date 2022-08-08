// Pagina de validaciones
// https://github.com/validatorjs/validator.js#validators

module.exports={
    name: {
        exists: true,
        errorMessage: "El campo nombre es requerido",
        isLength:{
            options: {min:3},
            errorMessage:"El campo tiene que tener mas de 3 caracteres"
        }
    },
    available:{
        isBoolean: true,
        errorMessage:"No es un booleano",
        custom: {
            options:(value)=> value,
            errorMessage: "Todas las insercciones deben estar disponibles en true"
        }
       

    }
}