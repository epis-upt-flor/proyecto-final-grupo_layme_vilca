'use client';
import { api } from "@/api";
import InputDragAndDrop from "@/components/form/input.file.dad";
import { useStoreSportCourt } from "@/stores/sportcourt.store";
import { schemaCreateSportCourts } from "@/validations/schema.create.sportcourts";
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Stack, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { DtoCreateSportCourt, Material } from "types";
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CreateSportCourt(){
    
    const { toggleCreateSportCourt } = useStoreSportCourt()
    const { data : materials , isLoading } = useQuery<Material[]>({
        queryKey : ['/api/material/list'],
        queryFn : api.getMaterials,
        initialData : []
    })
    const queryClient = useQueryClient()
    const mutation = useMutation(api.storeSportCourt,{
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['/api/sportcourts/me'])
            setSubmitting(false)
            resetForm()
            toggleCreateSportCourt(false)
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

    const { values: sportcourt,
        touched,
        errors,
        setSubmitting,
        isSubmitting,
        handleSubmit,
        resetForm,
        setFieldValue,
        handleChange } = useFormik<DtoCreateSportCourt>({
            validationSchema: schemaCreateSportCourts,
            initialValues: {
                name: "",
                photo : null,
                description: "",
                price: 0,
                width : 0,
                long : 0,
                materialId : ""
            },
            onSubmit(validated) {
                mutation.mutate(validated)
                setSubmitting(true)
            },
        })

        
    return (<>
    <Stack spacing={2} padding={4}>
        <TextField
            name="name"
            size="small"
            fullWidth
            type="text"
            label="Nombre"
            defaultValue={sportcourt.name}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            onChange={handleChange}
        />
        <TextField
            name="description"
            size="small"
            fullWidth
            type="text"
            label="Descripción"
            defaultValue={sportcourt.description}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            onChange={handleChange}
        />
        <TextField
            name="price"
            size="small"
            fullWidth
            type="text"
            label="Precio"
            defaultValue={sportcourt.price}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
            onChange={handleChange}
        />
        <TextField
            name="width"
            size="small"
            fullWidth
            type="text"
            label="Ancho (m.)"
            defaultValue={sportcourt.width}
            error={touched.width && Boolean(errors.width)}
            helperText={touched.width && errors.width}
            onChange={handleChange}
        />
        <TextField
            name="long"
            size="small"
            fullWidth
            type="text"
            label="Largo (m.)"
            defaultValue={sportcourt.long}
            error={touched.long && Boolean(errors.long)}
            helperText={touched.long && errors.long}
            onChange={handleChange}
        />

         <FormControl sx={{ m: 1}}  >
            <InputLabel id="materialId">Material</InputLabel>
            <Select
                name="materialId"
                labelId="materialId"
                id="materialId"
                size="small"
                fullWidth
                error={touched.materialId && Boolean(errors.materialId)}
                value={{ id : sportcourt.materialId}}
                onChange={(e) => {
                    console.log({materialId : e.target.value})
                    setFieldValue("materialId",e.target.value)
                }}
                input={<OutlinedInput label="Material" />}                
                >
                {materials.map((material,index) => (
                    <MenuItem key={index} value={material.id}>{material.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
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