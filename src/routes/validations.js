import yup from "yup"

function validate(createFormValidation){
    try{
    return(req, res, next) =>{
        createFormValidation(req.body)
        next()
    }

    }catch(error){
        next(error)
    }
}
function createFormValidation(data) {
    const schema = yup.object().shape({
        nameUser: yup.string()
            .when('$nameUser', {
                is: (nameUser) => !nameUser, // Si nameUser es undefined o vacío
                then: (nameUser) => nameUser.default('anonimo'), // Establece el valor por defecto a "anonimo"
                otherwise: yup.string().min(1).max(50).matches(/^[a-z]+$/), // Si se proporciona un nombre, aplica las reglas existentes
            }),
        title: yup.string().required(),
    });

    // Asegúrate de pasar el contexto con el valor de nameUser al validar
    schema.validateSync(data);
}

export{validate,
    createFormValidation}