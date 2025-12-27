'use client'
import { useTranslations } from "next-intl"
import { ColumnDef } from "@tanstack/react-table"
import { UserAttributes } from "@rkh-ms/classify-lib"
import SortableHeadButton from "../_components/SortableHeadButton"

/**This custom hook returns user columns such as: Id, first name, last name, email & phone as 
 * column def, so can be passed as headers for the shadcn/ui table
 */
export const useUserColumns = () => {
    const t = useTranslations()

    const getUserColumns = <T extends { User: UserAttributes }>() => {
        const userColumns: ColumnDef<T>[] = [
            {
                accessorKey: 'User.id',
                header: () => {
                    return (
                        <SortableHeadButton
                            sortId={1}
                        >
                            {t('id')}
                        </SortableHeadButton>
                    )
                }
            },
            {
                accessorKey: "User.firstName",
                header: () => {
                    return (
                        <SortableHeadButton
                            sortId={2}
                        >
                            {t('name')}
                        </SortableHeadButton>
                    )
                },
                cell: ({ row }) => {
                    const { firstName, lastName } = row.original.User
                    return firstName + ' ' + lastName
                },
            },
            {
                accessorKey: "User.email",
                header: () => {
                    return (
                        <SortableHeadButton
                            sortId={4}
                        >
                            {t('email')}
                        </SortableHeadButton>
                    )
                }
            },
            {
                accessorKey: "User.phone",
                header: () => {
                    return (
                        <SortableHeadButton
                            sortId={5}
                        >
                            {t('phone')}
                        </SortableHeadButton>
                    )
                },
            }
        ]

        return userColumns
    }

    return { getUserColumns }
}
