'use client'

import { ManagerQuery, PaginationResponse } from "@rkh-ms/classify-lib"
import { DataTable } from "@/app/_components/data-table"
import { useUserColumns } from "@/app/_hooks/use-userColumns"
import { ColumnDef } from "@tanstack/react-table"
import SortableHeadButton from "./SortableHeadButton"
import { useTranslations } from "next-intl"
import DeleteManagerDialog from "./managers/DeleteManagerDialog"
import ReAddManagerDialog from "./managers/ReAddManagerDialog"

/**Type that describe a manager that
 ** teacher related fields have been removed
 */
type ManagerRow = {
    id: ManagerQuery['id'],
    startDate: ManagerQuery['startDate'],
    endDate: ManagerQuery['endDate'],
    User: ManagerQuery['Teacher']['User']
}

const ManagersTable = ({
    managers
}: {
    managers: PaginationResponse<ManagerQuery>
}) => {

    const t = useTranslations()

    const managersRows: ManagerRow[] = managers.rows.map(m => ({
        id: m.id,
        startDate: m.startDate,
        endDate: m.endDate,
        User: { ...m.Teacher.User }
    }))


    const { getUserColumns } = useUserColumns()
    const columns: ColumnDef<ManagerRow>[] = [
        ...getUserColumns<ManagerRow>(),
        {
            accessorKey: 'startDate',
            header: () => {
                return (
                    <SortableHeadButton
                        sortId={6}
                    >
                        {t('joined')}
                    </SortableHeadButton>
                )
            }
        },
        {
            accessorKey: 'endDate',
            header: () => {
                return (
                    <SortableHeadButton
                        sortId={7}
                    >
                        {t('left')}
                    </SortableHeadButton>
                )
            }
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const manager = row.original

                const name = manager.User.firstName + ' ' + manager.User.lastName
                const isCurrentManager = manager.endDate === null

                return (
                    <>
                        {isCurrentManager && <DeleteManagerDialog id={manager.id} name={name} />}
                        {!isCurrentManager && <ReAddManagerDialog id={manager.id} name={name} />}
                    </>
                )
            }
        }
    ]

    return (
        <DataTable
            data={managersRows}
            columns={columns}
            pagination={managers.pagination}
        />
    )
}

export default ManagersTable