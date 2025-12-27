'use client'

import { endShift } from "@/app/_actions/EndShift"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import { useLocation } from "@/app/_hooks/use-location"
import useRequest from "@/app/_hooks/use-request"
import { useTranslations } from "next-intl"

interface EndShiftProps {
    shiftId: string,
    open: boolean,
    setIsOpen: (open: boolean) => void
}

const EndShift: React.FC<EndShiftProps> = ({
    open,
    setIsOpen,
    shiftId
}) => {

    const t = useTranslations()

    const { getLocation } = useLocation()
    const { doRequest } = useRequest({
        toThrowError: true
    })

    /**handle user accept to end the shift
     * 
     * first access their location
     * 
     * then make API call to end the shift
     */
    const handleAccept = async () =>
        new Promise<void>((resolve, reject) => {
            getLocation(async (location) => {

                try {
                    await doRequest(() => endShift(shiftId, location))
                    resolve()
                } catch {
                    reject()
                }

            })
        })



    return (
        <WrappedAlertDialog
            isOpen={open}
            setIsOpen={setIsOpen}
            onAccept={handleAccept}
            message={t('endShiftAlert')}
            successMsg={t('shiftEndedSuccess')}
        />
    )
}

export default EndShift