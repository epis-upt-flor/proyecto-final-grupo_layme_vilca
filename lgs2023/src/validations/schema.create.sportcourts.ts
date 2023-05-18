import * as yup from "yup";

export const schemaCreateSportCourts = yup.object({
    name : yup.string().min(1).required(),
    photo : yup.mixed().test("fileSize","La imagen es muy pesada",(file) => {
        //@ts-ignore
        return file?.size <= 2000000
    }),
    description : yup.string().required(),
    price : yup.number().min(1).required(),
    width : yup.number().min(1).required(),
    long : yup.number().min(1).required(),
})