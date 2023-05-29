'use client'

import { api } from "@/api"
import DataTable from "@/components/DataTable"
import DialogBasic from "@/components/DialogBasic"
import { useStoreReservation } from "@/stores/reservation.store"
import { Edit } from "@mui/icons-material"
import { Box, Breadcrumbs, Button, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"
import { Reservation, ResponseReservation } from "types"
import EditPayment from "./components/edit.payment"
import CreateReservation from "./create"

export default function ListReservation(){

    const { setEditReservation ,isOpenCreateReservation, toggleCreateReservation , isOpenEditReservation , closeEditReservation } = useStoreReservation()
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
            id : "payed",
            header : "",
            cell({row}){
                return (
                    <Chip label={row.original.payed?"Pagado" : "No Pagado"} variant="outlined" />
                )
            }
        }),
        columnHelper.accessor(() => null,{
            id : "SportCourts",
            header : "",
            enableColumnFilter : false,
            enableGlobalFilter : false,
            cell({row}) {
                return (
                    <Tooltip title="Pagar">
                        <IconButton
                            color="error"
                            disabled={row.original.payed || row.original.methodPayment == "Efectivo"}
                            onClick={()=> {
                                setEditReservation(row.original)
                        }}>
                            <Edit fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                )
            }
        })
    ]),[])
    return (<>
    <DialogBasic isOpen={isOpenCreateReservation} handleOpenDialog={toggleCreateReservation}>
        <CreateReservation/>
    </DialogBasic>
    <DialogBasic isOpen={isOpenEditReservation} handleOpenDialog={(isOpen : boolean) => closeEditReservation() }>
        <EditPayment/>
    </DialogBasic>
    <Stack spacing={2} padding={6} direction="column">
        <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Reservas</Typography>
        </Breadcrumbs>
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => {
                toggleCreateReservation(true)
            }} >Nueva reserva</Button>
        </Box>
        <DataTable columns={columns} data={reservations}/>
    </Stack>
    </>)
}