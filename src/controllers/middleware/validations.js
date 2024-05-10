import yup from "yup";
import { validationError } from "../../utils/validationError.js";

function validate(createFormValidation) {
  return async (req, res, next) => {
    try {
      const validatedData = await createFormValidation(req.body);
      req.body = validatedData;
      //console.log(req.body);
      next();
    } catch (error) {
      next(new validationError(error));
    }
  };
}

async function createFormValidation(data) {
  const schema = yup.object().shape({
    userName: yup
      .string()
      .transform((value, originalValue) => {
        if (!originalValue) return "anonimo";
        return value;
      })
      .max(50, "El nombre no puede contener más de 50 caracteres")
      .matches(
        /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
        "Nombre incorrecto"
      ),
    userPost: yup.string("Este campo no puede estar vacio").required(),
    userDate: yup
      .string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{2,4})$/,
        "La fecha debe estar en el siguiente formato dd/mm/yyyy"
      )
      .required(),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

export { validate, createFormValidation };
