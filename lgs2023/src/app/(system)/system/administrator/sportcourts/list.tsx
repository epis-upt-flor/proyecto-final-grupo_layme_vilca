'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { schemaCreateSportCourts } from "@/validations/schema.create.sportcourts";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Box, Breadcrumbs, Button, Card, CardContent, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DataTable from "@/components/DataTable";
import { SportCourt } from "types";
import Link from "next/link";
import DialogBasic from "@/components/DialogBasic";
import { useStoreSportCourt } from "@/stores/sportcourt.store";
import CreateSportCourt from "./create";
import { Dashboard, Delete, DeleteForeverOutlined } from "@mui/icons-material";
import { useSession } from "next-auth/react";

export default function ListSportCourt(){
    
    const { isOpenCreateSportCourt , toggleCreateSportCourt } = useStoreSportCourt()
    const {data : sportcourts , isLoading } = useQuery<SportCourt[]>({
        queryKey : ['/api/sportcourts/me'],
        queryFn : api.getMySportCourts,
        initialData : []
    })
    

    const columnHelper = createColumnHelper<SportCourt>()
    const columns : ColumnDef<SportCourt>[] = useMemo<ColumnDef<SportCourt,any>[]>(()=>([
        columnHelper.accessor(
            (_,index) => ++index,
            { header : 'N°'}
        ),
        columnHelper.accessor(
            "name",
            { header : 'Canchas'}
        ),
        columnHelper.accessor(() => null,{
            id : "SportCourts",
            header : "",
            enableColumnFilter : false,
            enableGlobalFilter : false,
            cell({row}) {
                return (
                    <Tooltip title="Borrar">
                        <IconButton
                            color="error"
                            onClick={()=> {
                                // setSubRoomId(props.row.original.subRoomId)
                                // setIsOpenDialogCreate(true)
                        }}>
                            <Delete fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                )
            }
        })
    ]),[])

    //MUI
    return (<>
    <DialogBasic isOpen={isOpenCreateSportCourt} handleOpenDialog={toggleCreateSportCourt}>
        <CreateSportCourt/>
    </DialogBasic>
    <Stack spacing={2} padding={6} direction="column">
        <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Canchas operativas</Typography>
            {/* <Link color="inherit" href="/system/sportcenters">
                Centros deportivos
            </Link> */}
            {/* <Typography color="text.primary">Lista</Typography> */}
        </Breadcrumbs>
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => {
                toggleCreateSportCourt(true)
            }} >Nueva Cancha</Button>
        </Box>
        <DataTable columns={columns} data={sportcourts}/>
    </Stack>
    </>)
}