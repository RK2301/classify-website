'use client'

import { useTranslations } from "next-intl"
import { MdDelete, MdEdit } from "react-icons/md"

import WrappedDropdown, { WrappedDropdownMenuItem } from "@/app/_components/WrappedDropdown"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import { useState } from "react"
import useRequest from "@/app/_hooks/use-request"
import { deleteSubject } from "@/app/_actions/deleteSubject"
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams"
import { SearchParams } from "@/app/_utils/SearchParams"
import { useSubjectDrawerState } from "@/app/_context/SubjectDrawerState"

interface SubjectDropMenuProps {
    subjectId: number
}

/**This component represent the dropmenu actions for a subject from a list */
const SubjectDropMenu: React.FC<SubjectDropMenuProps> = ({ subjectId }) => {

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const t = useTranslations()

    const { setSearchParam, getSearchParam } = useClassifyCustomSearchParams()
    const { onOpenChange } = useSubjectDrawerState()

    const { doRequest } = useRequest({
        toThrowError: true
    })

    const handleAccept = () => doRequest(() => deleteSubject(subjectId))

    const handleEdit = () => {

        setSearchParam(SearchParams.SubjectId, String(subjectId))

        // open the Drawer for smartphone users
        onOpenChange(true)
    }

    return (
        <>
            <WrappedDropdown>
                <WrappedDropdownMenuItem
                    label={t('edit')}
                    Icon={MdEdit}
                    onClick={handleEdit}
                />

                <WrappedDropdownMenuItem
                    label={t('delete')}
                    Icon={MdDelete}
                    onClick={() => setIsDeleteOpen(true)}
                    danger

                    // can't delete subject currently selected to be updated
                    disabled={Number(getSearchParam(SearchParams.SubjectId)) === subjectId}
                />
            </WrappedDropdown>

            <WrappedAlertDialog
                danger
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                message={t('deleteSubjectAlert')}
                onAccept={handleAccept}
                successMsg={t('deleteSubjectSuccess')}
            />
        </>
    )
}

export default SubjectDropMenu