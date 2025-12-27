'use client'
import { useLocale, useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table"
import { PaginationResponse, TeacherQuery } from "@rkh-ms/classify-lib";
import { DataTable } from "@/app/_components/data-table"
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import SortableHeadButton from "./SortableHeadButton";
import { Language } from "../_types/Language";
import SubjectsList from "@/app/_components/teachers/SubjectsList";
import WrappedDropdown, { WrappedDropdownMenuItem } from "./WrappedDropdown";
import Link from "next/link";



const TeachersTable = ({
    teachers
}: {
    teachers: PaginationResponse<TeacherQuery>
}) => {
    const t = useTranslations()
    const locale = useLocale() as Language

    const columns: ColumnDef<TeacherQuery>[] = [
        {
            accessorKey: "User.id",
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
        },
        {
            id: 'subjects',
            header: t('subjects'),
            cell: ({ row }) => {

                const subjects = row.original.Subjects

                return (
                    <div className="flex items-center justify-center gap-1">
                        <span> {subjects[0]?.[locale]} </span>

                        <SubjectsList subjects={subjects} />
                    </div>
                )
            }
        },
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
            id: "actions",
            cell: ({ row }) => {
                const teacherId = row.original.id

                return (
                    <WrappedDropdown>
                        <Link href={`/app/teachers/${teacherId}`}>
                            <WrappedDropdownMenuItem
                                Icon={MdEdit}
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
            data={teachers.rows}
            pagination={teachers.pagination}
        />
    )
}

export default TeachersTable