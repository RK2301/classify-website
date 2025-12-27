'use client'
import { FaUserMinus } from "react-icons/fa"
import { useState } from "react"
import { useTranslations } from "next-intl"


import IconButton from "@/app/_components/IconButton"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { withdrawalStudentAction } from "@/app/_actions/withdrawalStudentAction"


interface WithdrawalStudentProps {
    courseId: number,
    /**student id, which need to be withdrawal */
    studentId: string,
    /**student name to be withdrawal */
    studentName: string
}


/**This component shows a button to open dialog and unassign a teacher from specific course */
const WithdrawalStudent: React.FC<WithdrawalStudentProps> = ({ courseId, studentId, studentName }) => {


    const t = useTranslations()

    const [open, setOpen] = useState<boolean>(false)
    const onOpenChange = () => setOpen(open => !open)

    const { doRequest } = useRequest({
        toThrowError: true
    })

    /**when user accept to withdrawal the student, 
     * then make request to the server action to withdrawal the student*/
    const handleAccept = async () => {
        await doRequest(() => withdrawalStudentAction(courseId, studentId))
    }

    return (
        <>
            <IconButton onClick={onOpenChange}>
                <FaUserMinus />
            </IconButton>

            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={onOpenChange}

                message={t('withdrawalStudentAlert')}
                successMsg={t('withdrawSuccess', {
                    name: studentName
                })}

                onAccept={handleAccept}
                danger
            />
        </>
    )
}

export default WithdrawalStudent