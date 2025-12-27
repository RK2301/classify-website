'use client'
import { PaginationResponse, StudentQuery } from "@rkh-ms/classify-lib"
import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { MdDeleteOutline } from "react-icons/md"
import { HiMiniPencil } from "react-icons/hi2";
import Link from "next/link"



import SortableHeadButton from "@/app/_components/SortableHeadButton"
import { DataTable } from "@/app/_components/data-table"
import { useUserColumns } from "@/app/_hooks/use-userColumns"
import ParentsDetailsPopover from "@/app/_components/ParentsDetailsPopover"
import WrappedDropdown, { WrappedDropdownMenuItem } from "@/app/_components/WrappedDropdown";



const StudnetsTable = ({
    students }: {
        students: PaginationResponse<StudentQuery>
    }) => {
    const t = useTranslations()
    const { getUserColumns } = useUserColumns()

    const columns: ColumnDef<StudentQuery>[] = [
        ...getUserColumns<StudentQuery>(),
        {
            accessorKey: 'grade',
            header: ({ }) => (
                <SortableHeadButton sortId={6}>
                    {t('class')}
                </SortableHeadButton>
            )
        },
        {
            id: 'parents',
            header: t('parents'),
            cell: ({ row }) => {
                const { motherName, motherPhone, fatherName, fatherPhone } = row.original

                return <ParentsDetailsPopover parents={{
                    motherName,
                    motherPhone,
                    fatherName,
                    fatherPhone
                }} />
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const { id } = row.original

                return (
                    <WrappedDropdown>
                        <Link href={`/app/students/${id}`}>
                            <WrappedDropdownMenuItem
                                Icon={HiMiniPencil}
                                label={t('edit')}
                                onClick={() => { }}
                            />
                        </Link>

                        <WrappedDropdownMenuItem
                            Icon={MdDeleteOutline}
                            label={t('delete')}
                            onClick={() => { }}
                            danger
                        />
                    </WrappedDropdown>
                )
            },
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={students.rows}
            pagination={students.pagination}
        />
    )
}

export default StudnetsTable