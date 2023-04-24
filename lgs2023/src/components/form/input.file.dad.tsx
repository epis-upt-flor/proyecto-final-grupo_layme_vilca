import { AddAPhoto } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";


type PropsInputDragAndDrop = {
    onChange : (file : File|null) => void
}
export default function InputDragAndDrop({onChange} : PropsInputDragAndDrop){
    const inputRef = useRef(null)
    const [dragActive , setDragActive] = useState<boolean>(false)
    const [file,setFile] = useState<File|null>(null)
    const [urlImage , setUrlImage] = useState<string | undefined |ArrayBuffer | null>(null)

    const handleChangeFile = (e : ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(e.target.files){
            const file : File | null = e.target.files[0]
            if(file){
                setFile(file)
                onChange(file)
            }   
        }
    }

    const handleDrop = (e : DragEvent<HTMLDivElement>) => {
        console.log(e.dataTransfer)
        console.log(e.dataTransfer.files)
    }

    const handleDrag = (e : DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        setDragActive(true)
    }
    useEffect(() => {
        let isCancel = true
        let reader = new FileReader()
        reader.onload = ({target} : ProgressEvent<FileReader>) => {
            const result : string | undefined |ArrayBuffer | null = target?.result
            if (result) {
                setUrlImage(result)   
            }
        }
        if(file){
            reader.readAsDataURL(file)
        }
        return () => {
            isCancel = true;
            if (isCancel && reader.readyState === 1) {
                reader.abort();
            }
        }
    },[file])

    return (
        <Card>
            <CardContent sx={{ p :0 ,display : "flex" , flexDirection : "column" , alignItems: "center" }}>
                <Box sx={{ 
                        display : "flex",
                        justifyContent : "center",
                        alignItems : "center",
                        border : "1px dashed rgba(145, 158, 171, 0.4)",
                        width : "128px",
                        height : "128px",
                        borderRadius : "50%",
                        my : 2,
                        cursor : "pointer",
                    }}
                    onDragOver={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    onDrop={handleDrop}
                    onDragEnter={handleDrag}
                    onClick={
                        () => {
                            //@ts-ignore
                            inputRef.current.click()
                        }
                    }
                >
                    <Box sx={{
                        borderRadius : "50%" ,
                        width : "calc(100% - 16px)" ,
                        height : "calc(100% - 16px)" ,
                        backgroundColor : t => dragActive ? 'rgb(255, 233, 213)' : t.palette.grey[50] ,
                    }}

                    display="flex" justifyContent="center" alignItems="center">
                        <Stack  direction="column" justifyContent="center" alignItems="center">
                            {
                                urlImage ? <Box
                                component="img"
                                sx={{
                                    backgroundSize : "cover",
                                    borderRadius : "50%",
                                    backgroundImage: `url(${urlImage || "/default500.jpg"})`,
                                    width : "112px",
                                    height : "112px",
                                    }}
                                ></Box> 
                                :(<>
                                    <AddAPhoto sx={{color : "rgb(145, 158, 171)"}}/>
                                    <Typography variant="caption">Subir foto</Typography>
                                </>) 
                            }
                        </Stack>
                    </Box>
                </Box>                    
                <Stack>
                    <Typography variant="caption" textAlign="center">Permito *.jpeg, *.jpg, *.png</Typography>
                    <Typography variant="caption" textAlign="center">tamaño maximo 3.1MB</Typography>
                </Stack>
                
                <input
                    ref={inputRef}
                    onChange={e => handleChangeFile(e)}
                    hidden type="file"  />
            </CardContent>
        </Card>
    )
}