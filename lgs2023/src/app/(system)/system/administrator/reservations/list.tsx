'use client'

import { api } from "@/api"
import DataTable from "@/components/DataTable"
import { Edit } from "@mui/icons-material"
import { Breadcrumbs, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"
import { Reservation, ResponseReservation } from "types"

export default function ListReservation(){

    const { data : reservations , isLoading } = useQuery<ResponseReservation[]>({
        queryKey : ['/api/reservations/me'],
        queryFn : api.getMyReservations,
        initialData : []
    })
    const columnHelper = createColumnHelper<ResponseReservation>()
    const columns : ColumnDef<ResponseReservation>[] = useMemo<ColumnDef<ResponseReservation,any>[]>(()=>([
        columnHelper.accessor(
            (_,index) => ++index,
            { header : 'N°'}
        ),
        columnHelper.accessor(
            "sportCourtName",
            { header : 'Cancha'}
        ),
        columnHelper.accessor(
            "date",
            { header : 'Fecha'}
        ),
        columnHelper.accessor(
            "hourStart",
            { header : 'Hora Inicio'}
        ),
        columnHelper.accessor(
            "hourEnd",
            { header : 'Hora Fin'}
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
                            <Edit fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                )
            }
        })
    ]),[])
    return (<>
    <Stack spacing={2} padding={6} direction="column">
        <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Reservas</Typography>
        </Breadcrumbs>
        <DataTable columns={columns} data={reservations}/>
    </Stack>
    </>)
}