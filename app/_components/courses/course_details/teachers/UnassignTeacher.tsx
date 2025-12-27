'use client'
import { FaUserMinus } from "react-icons/fa"
import { useState } from "react"
import { useTranslations } from "next-intl"


import IconButton from "@/app/_components/IconButton"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { unAssignTeacherAction } from "@/app/_actions/unAssignTeacherAction"


interface UnassignTeacherProps {
    courseId: number,
    /**teacher id, which need to be unassign */
    teacherId: string
}


/**This component shows a button to open dialog and unassign a teacher from specific course */
const UnassignTeacher: React.FC<UnassignTeacherProps> = ({ courseId, teacherId }) => {


    const t = useTranslations()

    const [open, setOpen] = useState<boolean>(false)
    const onOpenChange = () => setOpen(open => !open)

    const { doRequest } = useRequest({
        toThrowError: true
    })

    /**when user accept to delete the material, then make request to the server action to delete it */
    const handleAccept = async () => {
        await doRequest(() => unAssignTeacherAction(courseId, teacherId))
    }

    return (
        <>
            <IconButton onClick={onOpenChange}>
                <FaUserMinus />
            </IconButton>

            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={onOpenChange}

                message={t('unAssignTeacherAlert')}
                successMsg={t('unAssignTeacherSuccess')}

                onAccept={handleAccept}
                danger
            />
        </>
    )
}

export default UnassignTeacher