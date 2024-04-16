import yup from "yup";

function validate(createFormValidation) {
    return async (req, res, next) => {
        try {
            // se utiliza validate en lugar de validateSync para trabajar con promesas
            const validatedData = await createFormValidation(req.body);
            // se actualiza req.body con los datos validados y modificados
            req.body = validatedData
            //console.log(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
}

async function createFormValidation(data) {
    const schema = yup.object().shape({
        userName: yup.string()
            .transform((value, originalValue) =>{
                 // Si el valor original es vacío, se establece "anonimo" como valor por defecto
                 if (!originalValue) return 'anonimo';
                return value
            })
            .min(1).max(50, "Nombre muy largo").matches(/^[a-z]+$/, "solo se admiten acracteres de la a-z"), // Si se proporciona un nombre y se aplica las reglas existentes
        title: yup.string("Este campo no puede estar vacio").required(),
        date: yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{2})$/, 'La fecha debe estar en formato dd/mm/yy').required(),
    });

    const validatedData = await schema.validate(data);
    return validatedData
}

export { validate, createFormValidation };
