import * as yup from "yup";

export const schemaCreateSportCenter = yup.object({
    address  : yup.string().min(1).required(),
    name  : yup.string().required(),
    fullName  : yup.string().required(),
    telephone : yup.string().required(),
    email : yup.string().required(),
    latitude : yup.string().required(),
    longitude : yup.string().required(),
    openingHour : yup.string().required(),
    closingHour : yup.string().required() 
})

// userId : "",
// chargeCode : "",
// date : "",
// hourEnd : "",
// hourStart : "",
// sportCourtId : "",
// total : 0