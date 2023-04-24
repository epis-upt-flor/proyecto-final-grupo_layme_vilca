import { Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ColumnDef, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, RowData, SortingFn, sortingFns, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { RankingInfo,rankItem} from '@tanstack/match-sorter-utils'
import {  FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@mui/icons-material";

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}


const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)
    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

export type PropsDataTable<T> = {
    data : T[],
    columns : ColumnDef<T,any>[]
}

export default function DataTable<T>({ data , columns } : PropsDataTable<T> ){

    const [globalFilter , setGlobalFilter] = useState<string>("")
    const table = useReactTable({
        data : data,
        columns,
        getCoreRowModel : getCoreRowModel(),
        enableColumnFilters : true,
        state :{
            globalFilter
        },
        onGlobalFilterChange : setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        filterFns : {
            fuzzy : fuzzyFilter
        }
    })

    return (
        <>

        <TableContainer component={Paper}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField variant="outlined" fullWidth size="small" placeholder="Buscar ..." onChange={(e)=> setGlobalFilter(String(e.target.value)) } />
                    </Grid>
                </Grid>
            </Toolbar>
            <Table size="small" stickyHeader>
                <TableHead>
                    {
                        table.getHeaderGroups().map(headerGroup =>(
                            <TableRow key={`RowH${headerGroup.id}`}>
                                {
                                    headerGroup.headers.map(header =>(
                                        <TableCell key={`Cell${header.id}`}>
                                        {
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                                )
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHead>
                <TableBody>
                    {
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={`R${row.id}`}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <TableCell key={`${cell.id}${cell.row.index}`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>

                <TableRow>
                    <TableCell colSpan={9}>
                        <Box sx={{ display : "flex" , flexDirection : "row" , justifyContent : "flex-end" }}>
                            <IconButton
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <FirstPage/>
                            </IconButton>
                            <IconButton
                                className="border rounded p-1"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <KeyboardArrowLeft/>
                            </IconButton>
                            <IconButton
                                className="border rounded p-1"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <KeyboardArrowRight/>
                            </IconButton>
                            <IconButton
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                <LastPage/>
                            </IconButton>
                            <Box sx={{ display : "flex" , alignItems : "center" , mr : 2 }}>
                                <Typography variant="body2">
                                    {`Page ${table.getState().pagination.pageIndex + 1} de ${table.getPageCount()} `}
                                </Typography>
                            </Box>

                            <TextField
                                    size="small"
                                    select
                                    value={table.getState().pagination.pageSize}
                                    variant="outlined"
                                    onChange={e => {
                                        table.setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10,20,40,50].map(pageSize => (
                                    <MenuItem key={pageSize} value={pageSize}>
                                        Mostrar {pageSize}
                                    </MenuItem>
                                    ))}
                            </TextField>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        </>
    )
}
