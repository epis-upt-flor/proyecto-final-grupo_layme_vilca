import { useState  } from "react"
import { signIn } from 'next-auth/react'
import Grid2 from '@mui/material/Unstable_Grid2';
import { Stack } from "@mui/system";
import { Button, TextField , Alert, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { schemaLogin } from "@/validations/schema.login";
import { Check } from "@mui/icons-material"

export default function Login(){

    const router = useRouter()
    const [isError , setIsError ] = useState<boolean>(false)
    const [isSuccess , setIsSuccess] = useState<boolean>(false)
    const formik = useFormik<{email : string , password : string}>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schemaLogin,
        onSubmit: async (values, { resetForm }) => {
            const response = await signIn('credentials', { redirect: false,
                 email: values.email,
                 password: values.password })
            console.log(response)
            if (response?.status === 200) {
                setIsError(false)
                setIsSuccess(true)
                resetForm()
                setTimeout( () => router.push('/system/dashboard') , 250)
            }else{
                setIsError(true)
                setIsSuccess(false)
            }

        },
    })

    return (<>
        <Grid2 container>
            <Grid2 xs={0} md={6} lg={8}>
                <img src="/login_wallpaper.png" alt="login" />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4} sx={{ display : "flex" , justifyContent : "center" , alignItems : "center" }}>
                <Stack component="form" spacing={2} sx={{ width : "100%" , mr : 4 }} >
                        {
                            isError &&
                            <Alert severity="error">
                                Usuario y/o contraseña invalida(s)
                            </Alert>
                        }
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            label="Correo"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button
                            onClick={() => formik.handleSubmit()}
                            color={isSuccess ? "success" : "primary"}
                            disabled={formik.isSubmitting}
                            variant="contained"
                            fullWidth
                            type="submit"
                            endIcon={formik.isSubmitting ? <CircularProgress size={10}></CircularProgress> :  isSuccess ?  <Check/> : <></>}
                            >
                            { formik.isSubmitting ? "Verificando..." : "Ingresar" }
                        </Button>
                    </Stack>
            </Grid2>
        </Grid2>
    </>)
}