import * as yup from "yup";

export const schemaCreateSportCenter = yup.object({
    fullName  : yup.string().min(1).required(),
    email  : yup.string().email().required(),
    telephone  : yup.string().min(1).required(),
    name : yup.string().min(1).required(),
    address : yup.string().required(),
    latitude : yup.string().required(),
    longitude : yup.string().required(),
    openingHour : yup.number().min(1).required(),
    closingHour : yup.number().min(1).required(),
    photo : yup.mixed().test("fileSize","La imagen es muy pesada",(file) => {
        //@ts-ignore
        return file?.size <= 2000000
    }),
  
})