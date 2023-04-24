'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from 'react'
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { schemaCreateSportCenter } from "@/validations/schema.create.sportcenter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Box, Breadcrumbs, Button, Card, CardContent, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DataTable from "@/components/DataTable";
import { SportCenter } from "types";
import Link from "next/link";
import DialogBasic from "@/components/DialogBasic";
import { useStoreSportCenter } from "@/stores/sportcenter.store";
import CreateSportCenter from "./create";
import { Dashboard, Delete, DeleteForeverOutlined } from "@mui/icons-material";

export default function ListSportCenter(){
    const { isOpenCreateSportCenter , toggleCreateSportCenter } = useStoreSportCenter()
    const {data : sportcenters , isLoading } = useQuery<SportCenter[]>({
        queryKey : ['/api/sportcenters'],
        queryFn : api.getSportCenters,
        initialData : []
    })
    

    const columnHelper = createColumnHelper<SportCenter>()
    const columns : ColumnDef<SportCenter>[] = useMemo<ColumnDef<SportCenter,any>[]>(()=>([
        columnHelper.accessor(
            (_,index) => ++index,
            { header : 'N°'}
        ),
        columnHelper.accessor(
            "name",
            { header : 'Centro deportivo'}
        ),
        columnHelper.accessor(
            "name",
            {
                header : 'Foto',
                cell(props) {
                    return <img width="40px" height="40px" src={props.row.original.photo} />
                },
            }
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

    return (<>
    <DialogBasic isOpen={isOpenCreateSportCenter} handleOpenDialog={toggleCreateSportCenter}>
        <CreateSportCenter/>
    </DialogBasic>
    <Stack spacing={2} padding={6} direction="column">
        <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Centro deportivos</Typography>
            {/* <Link color="inherit" href="/system/sportcenters">
                Centros deportivos
            </Link> */}
            {/* <Typography color="text.primary">Lista</Typography> */}
        </Breadcrumbs>
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => {
                toggleCreateSportCenter(true)
            }} >Nuevo Establecimiento</Button>
        </Box>
        <DataTable columns={columns} data={sportcenters}/>
    </Stack>
    </>)
}