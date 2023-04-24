import * as Yup from 'yup'
export const schemaLogin = Yup.object({
    email: Yup
        .string()
        .email('Correo invalido')
        .required('Es necesario un correo'),
    password: Yup
        .string()
        .min(8, 'La contraseña debe tener de 8 caracteres')
        .required('Es necesaria una contraseña')
})