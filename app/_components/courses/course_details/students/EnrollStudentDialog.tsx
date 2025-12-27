'use client'
import { FaUserPlus } from "react-icons/fa"
import { useState } from "react"
import { useTranslations } from "next-intl"


import IconButton from "@/app/_components/IconButton"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { enrolStudentAction } from "@/app/_actions/enrollStudentAction"


interface EnrollStudentDialogProps {
    courseId: number,
    /**student id, which need to be enrolled */
    studentId: string,
    studentName: string
}


/**This component shows a button to open dialog and enroll a student to specific course */
const EnrollStudentDialog: React.FC<EnrollStudentDialogProps> = ({ courseId, studentId, studentName }) => {


    const t = useTranslations()

    const [open, setOpen] = useState<boolean>(false)
    const onOpenChange = () => setOpen(open => !open)

    const { doRequest } = useRequest({
        toThrowError: true
    })

    /**when user accept to enroll the student, then make request to the server action to enroll him */
    const handleAccept = async () => {
        await doRequest(() => enrolStudentAction(courseId, studentId))
    }

    return (
        <>
            <IconButton onClick={onOpenChange}>
                <FaUserPlus />
            </IconButton>

            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={onOpenChange}

                message={t('reEnrollAlert')}
                successMsg={t('enrollSuccess', {
                    name: studentName
                })}

                onAccept={handleAccept}
            />
        </>
    )
}

export default EnrollStudentDialog