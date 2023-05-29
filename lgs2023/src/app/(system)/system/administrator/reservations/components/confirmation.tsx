import InputDragAndDrop from "@/components/form/input.file.dad"
import { useStoreReservation } from "@/stores/reservation.store"
import { schemaCreateReservation } from "@/validations/schema.create.reservation"
import { Button, FormControl, InputLabel, Select, Stack, TextField, Typography } from "@mui/material"
import { FormikErrors, FormikTouched, useFormik } from "formik"
import { DtoCreateReservation } from "types"


// 
export default function Confirmation(){

    const { newReservation } = useStoreReservation()
    return (
        <Stack>
            <Typography variant="h3" color="text.secondary" gutterBottom sx={{ textAlign : "center" }}>
                {newReservation.sportCourtName}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ textAlign : "center" }}>
                Duración 1h
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ textAlign : "center" }}>
                {newReservation.date}
            </Typography>
            <Typography variant="h2" color="text.primary" gutterBottom sx={{ textAlign : "center" }}>
                S/. {newReservation.total}
            </Typography>
        </Stack>
    )
}