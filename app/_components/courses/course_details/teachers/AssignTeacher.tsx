'use client'
import { FaUserPlus } from "react-icons/fa"
import { useState } from "react"
import { useTranslations } from "next-intl"


import IconButton from "@/app/_components/IconButton"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { assignTeacherAction } from "@/app/_actions/assignTeacherAction"


interface UnassignTeacherProps {
    courseId: number,
    /**teacher id, which need to be assign */
    teacherId: string,
    teacherName: string
}


/**This component shows a button to open dialog and assign a teacher to specific course */
const AssignTeacher: React.FC<UnassignTeacherProps> = ({ courseId, teacherId, teacherName }) => {


    const t = useTranslations()

    const [open, setOpen] = useState<boolean>(false)
    const onOpenChange = () => setOpen(open => !open)

    const { doRequest } = useRequest({
        toThrowError: true
    })

    /**when user accept to assign the teacher, then make request to the server action to assign him */
    const handleAccept = async () => {
        await doRequest(() => assignTeacherAction(courseId, teacherId))
    }

    return (
        <>
            <IconButton onClick={onOpenChange}>
                <FaUserPlus />
            </IconButton>

            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={onOpenChange}

                message={t('assignTeacherAlert')}
                successMsg={t('assignTeacherSuccess', {
                    name: teacherName
                })}

                onAccept={handleAccept}
            />
        </>
    )
}

export default AssignTeacher