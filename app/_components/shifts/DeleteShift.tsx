'use client'

import { deleteShiftAction } from "@/app/_actions/deleteShift"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { useTranslations } from "next-intl"

interface DeleteShiftProps {
    shiftId: string,
    open: boolean,
    setIsOpen: (open: boolean) => void
}

/**This component show a alert dialog to ask user to delete a shift */
const DeleteShift: React.FC<DeleteShiftProps> = ({
    shiftId,
    open,
    setIsOpen
}) => {

    const t = useTranslations()

    const { doRequest } = useRequest({
        toThrowError: true
    })

    // this function handle when user accept the message to delete the shift
    // by calling the delete action server
    const handleAccept = () =>
        new Promise<void>(async (resolve, reject) => {
            try {
                await doRequest(() => deleteShiftAction(shiftId))
                resolve()
            } catch {
                reject()
            }
        })

    return (
        <WrappedAlertDialog
            isOpen={open}
            setIsOpen={setIsOpen}
            message={t('deleteShiftAlert')}
            successMsg={t('deleteShiftSuccess')}
            onAccept={handleAccept}
            danger
        />
    )
}

export default DeleteShift