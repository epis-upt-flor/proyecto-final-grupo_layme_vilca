'use client';
import { api } from "@/api";
import InputDragAndDrop from "@/components/form/input.file.dad";
import StepperLinearHorizontal, { StepItem } from "@/components/StepperLinearHorizontal";
import { useStoreReservation } from "@/stores/reservation.store";
import { useStoreSportCenter } from "@/stores/sportcenter.store";
import { schemaCreateSportCenter } from "@/validations/schema.create.sportcenter";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { DtoCreateReservation, DtoCreateSportCenter, ResponseReservationsBySportCourt } from "types";
import ChooseSportCourt from "./components/choose.court";
import Confirmation from "./components/confirmation";
import Scheduler from "./components/scheduler";



export default function CreateReservation(){
    
    const { newReservation , toggleCreateReservation } = useStoreReservation()
    const { data : reservations , isLoading } = useQuery<ResponseReservationsBySportCourt[]>({
        queryKey : ['/api/reservations/bysportcourt'],
        queryFn : () => api.getReservationsBySportCourtId(newReservation.sportCourtId),
        initialData : [],
        enabled : newReservation.sportCourtId.length > 0
    })
    
    const steps : StepItem[] = [
        {
            index : 0,
            title : "Selecionar Cancha",
            Component : () => <ChooseSportCourt/>
        },
        {
            index : 1,
            title : "Selecionar horario",
            Component : () => <Scheduler reservations={reservations}/>
        },
        {
            index : 2,
            title : "Confirmar",
            Component : () => <Confirmation/>
        }
    ]

    
    const queryClient = useQueryClient()
    const mutation = useMutation(api.storeReservation,{
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['/api/reservations/me'])
            toggleCreateReservation(false)
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

    

    const handleCreateReservation = () => {
        // console.log(newReservation)
        mutation.mutate(newReservation)
    }
    

    return (<>
    <Stack spacing={2} padding={4}>
        <StepperLinearHorizontal steps={steps} onDone={handleCreateReservation}/>
    </Stack>
    </>)
}