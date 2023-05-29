import { api } from "@/api";
import { useStoreReservation } from "@/stores/reservation.store";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function EditPayment(){
    const { editReservation , closeEditReservation } = useStoreReservation()
    const queryClient = useQueryClient()
    const mutation = useMutation(api.updateReservationPayment,{
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['/api/reservations/me'])
            closeEditReservation()
        },
        onError(error : any, variables, context) {
            if(axios.isAxiosError(error) && error){
                const err : any = error as AxiosError
                Error(String(err?.response?.data?.message))
            }else{
                Error("No se pudo reaizar el registro.")
                console.error("DESCONOCIDO",error)
            }
        },
    })

    const handlePayment = () => {
        if(editReservation){
            mutation.mutate({ id : editReservation.id , total : editReservation.total})
        }
    }

    return (
        <Card>
            <CardContent>
                <Stack gap={2} padding={2}>
                    <Typography variant="h3" color="text.secondary" gutterBottom sx={{ textAlign : "center" }}>
                        {editReservation?.sportCourtName}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ textAlign : "center" }}>
                        Duración 1h
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ textAlign : "center" }}>
                        {editReservation?.date}
                    </Typography>
                    <Typography variant="h2" color="text.primary" gutterBottom sx={{ textAlign : "center" }}>
                        S/. {editReservation?.total}
                    </Typography>

                    <Button variant="outlined" onClick={handlePayment}>Realizar pago</Button>
                </Stack>
            </CardContent>
        </Card>
    )

}