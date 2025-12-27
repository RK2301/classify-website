"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PaginationControls from "./PaginationControls"
import { Pagination } from "@rkh-ms/classify-lib"
import TableResult from "@/app/_components/TableResult"
import TablePageSizeSelector from "./TablePageSizeSelector"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: Pagination
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: false,
        autoResetPageIndex: true
    })

    const t = useTranslations()

    return (
        <div className="rounded-md border border-[var(--color-grey-200)] bg-[var(--color-grey-0)]">
            <Table>
                <TableHeader className="bg-[var(--color-grey-50)]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}
                                        className="text-[var(--color-grey-600)] first:rounded-ss-md last:rounded-se-md
                                        py-2 font-semibold tracking-widest"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="py-2.5 px-2 text-center">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                {t('noResults')}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>

                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={columns.length} className="rounded-es-md rounded-ee-md">
                            <div className="flex justify-between items-stretch px-2">

                                <div className="flex items-center justify-between gap-4">
                                    <TableResult totalItems={pagination.totalItems} />
                                    <Separator orientation='vertical' />
                                    <TablePageSizeSelector />
                                </div>

                                <PaginationControls pagination={pagination} />
                            </div>

                        </TableCell>
                    </TableRow>

                </TableFooter>
            </Table>
        </div>
    )
}