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
function createFormValidation(data){

    const { name, title} = data

    const schema = yup.object().shape({
        nameUser: yup.string().min(2).matches(/^[a-z]+$/),
        title: yup.string().required(),
})
    schema.validateSync(data)
}

export{validate,
    createFormValidation}