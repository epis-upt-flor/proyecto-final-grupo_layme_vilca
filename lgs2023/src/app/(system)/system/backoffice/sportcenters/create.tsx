'use client';
import { api } from "@/api";
import InputDragAndDrop from "@/components/form/input.file.dad";
import { useStoreSportCenter } from "@/stores/sportcenter.store";
import { schemaCreateSportCenter } from "@/validations/schema.create.sportcenter";
import { Button, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { DtoCreateSportCenter } from "types";

export default function CreateSportCenter(){
    
    const { toggleCreateSportCenter } = useStoreSportCenter()
    const queryClient = useQueryClient()
    const mutation = useMutation(api.storeSportCenter,{
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['/api/sportcenters'])
            setSubmitting(false)
            resetForm()
            toggleCreateSportCenter(false)
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

    const { values: sportcenter,
        touched,
        errors,
        setSubmitting,
        isSubmitting,
        handleSubmit,
        resetForm,
        setFieldValue,
        handleChange } = useFormik<DtoCreateSportCenter>({
            validationSchema: schemaCreateSportCenter,
            initialValues: {
                fullName : "",
                telephone : "",
                email: "",
                name: "",
                address : "",
                latitude : "",
                longitude : "",
                photo : null,
            },
            onSubmit(validated) {
                
                mutation.mutate(validated)
                setSubmitting(true)
            },
        })

    return (<>
    <Stack spacing={2} padding={4}>
        <TextField
            name="fullName"
            size="small"
            fullWidth
            type="text"
            label="Nombre completo"
            defaultValue={sportcenter.fullName}
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
            onChange={handleChange}
        />
        <TextField
            name="email"
            size="small"
            fullWidth
            type="email"
            label="Correo"
            defaultValue={sportcenter.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            onChange={handleChange}
        />
        <TextField
            name="telephone"
            size="small"
            fullWidth
            type="tel"
            label="Telefono"
            defaultValue={sportcenter.telephone}
            error={touched.telephone && Boolean(errors.telephone)}
            helperText={touched.telephone && errors.telephone}
            onChange={handleChange}
        />


        <TextField
            name="name"
            size="small"
            fullWidth
            type="text"
            label="Nombre"
            defaultValue={sportcenter.name}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            onChange={handleChange}
        />
        <TextField
            name="address"
            size="small"
            fullWidth
            type="text"
            label="Dirección"
            defaultValue={sportcenter.address}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
            onChange={handleChange}
        />
        <TextField
            name="latitude"
            size="small"
            fullWidth
            type="text"
            label="Latitud"
            defaultValue={sportcenter.latitude}
            error={touched.latitude && Boolean(errors.latitude)}
            helperText={touched.latitude && errors.latitude}
            onChange={handleChange}
        />
        <TextField
            name="longitude"
            size="small"
            fullWidth
            type="text"
            label="Longitud"
            defaultValue={sportcenter.longitude}
            error={touched.longitude && Boolean(errors.longitude)}
            helperText={touched.longitude && errors.longitude}
            onChange={handleChange}
        />
        <InputDragAndDrop
        onChange={(file)=> {
            setFieldValue("photo",file)
        }}
    />                     
        <Button variant="contained" disabled={isSubmitting} onClick={() => {
            handleSubmit()
            console.log({errors})
        }}>Crear</Button>
    </Stack>
    </>)
}