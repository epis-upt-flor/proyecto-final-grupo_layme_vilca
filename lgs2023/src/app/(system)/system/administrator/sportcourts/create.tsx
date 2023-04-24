'use client';
import { api } from "@/api";
import InputDragAndDrop from "@/components/form/input.file.dad";
import { useStoreSportCourt } from "@/stores/sportcourt.store";
import { schemaCreateSportCourts } from "@/validations/schema.create.sportcourts";
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { DtoCreateSportCourt } from "types";
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CreateSportCourt(){
    
    const { toggleCreateSportCourt } = useStoreSportCourt()
    const queryClient = useQueryClient()
    const mutation = useMutation(api.storeSportCourt,{
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries(['/api/sportcourts'])
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
                price: "",
                businessHours: ""

            },
            onSubmit(validated) {
                mutation.mutate(validated)
                setSubmitting(true)
            },
        })

        // const days = [
        //     'Lunes',
        //     'Martes',
        //     'Miercoles',
        //     'Jueves',
        //     'Viernes',
        //     'Sabado',
        //     'Domingo',
        //   ];

        // const ITEM_HEIGHT = 48;
        // const ITEM_PADDING_TOP = 8;
        // const MenuProps = {
        //     PaperProps: {
        //         style: {
        //         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //         width: 250,
        //         },
        //     },
        // };
        // const [dayName, setDayName] = useState<string[]>([]);

        // interface MyEventTarget {
        //     value: string | string[];
        // }
        // const handleChangeDay = (event: ChangeEvent<MyEventTarget>) => {
        //     const { value } = event.target;
        //     setDayName(
        //       typeof value === 'string' ? value.split(',') : value,
        //     );
        //   }
        
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
            name="businessHours"
            size="small"
            fullWidth
            type="text"
            label="Horario de atención"
            defaultValue={sportcourt.businessHours}
            error={touched.businessHours && Boolean(errors.businessHours)}
            helperText={touched.businessHours && errors.businessHours}
            onChange={handleChange}
        />
         {/* <FormControl sx={{ m: 1}}  >
            <InputLabel id="demo-multiple-checkbox-label">Dias de atención</InputLabel>
            <Select
                name="businessHours"
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                // size="small"
                fullWidth
                multiple
                value={dayName}
                onChange={handleChange}
                input={<OutlinedInput label="Dias de atención" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {days.map((day) => (
                    <MenuItem key={day} value={day}>
                    <Checkbox checked={dayName.indexOf(day) > -1} />
                    <ListItemText primary={day} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl> */}
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