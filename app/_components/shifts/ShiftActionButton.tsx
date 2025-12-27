'use client'
import { endShift } from "@/app/_actions/EndShift"
import { startShift } from "@/app/_actions/startShift"
import { useLocation } from "@/app/_hooks/use-location"
import useRequest from "@/app/_hooks/use-request"
import { useTranslations } from "next-intl"
import { useTransition } from "react"
import { MdCropSquare, MdOutlinePlayArrow } from "react-icons/md"
import { toast } from "sonner"

type ShiftActionButtonProps = {
    /**indicate if there is current shift active */
    isShiftActive: boolean
    /**shift id in case need to end it */
    id?: string
}

const ShiftActionButton: React.FC<ShiftActionButtonProps> = ({ isShiftActive, id }) => {

    const [pending, startTransition] = useTransition()
    const t = useTranslations()

    const { doRequest } = useRequest({
        toThrowError: true,
        showErrorInToast: true
    })

    const { getLocation } = useLocation()

    const handleClick = () => {

        // 1. access user location
        getLocation((location) => {

            //start the req to start or end
            const reqPromise = doRequest(() => isShiftActive ? endShift(id!, location) : startShift(location))

            startTransition(() => reqPromise)

            // 2. make request to start a new shift or end it
            toast.promise(reqPromise, {
                loading: t('pleaseWait'),
                success: isShiftActive ? t('shiftEndedSuccess') : t('startShiftSuccess')
            })
        })
    }

    return (
        <button
            onClick={handleClick}
            disabled={pending}
            className={`rounded-full p-2.5 w-auto
                                     ${isShiftActive ? 'bg-red-700' : 'bg-brand-500'}
                                    text-black/50
                                    transition-all duration-300
                                    active:scale-95 transform
                                    disabled:opacity-50`}
        >
            {isShiftActive ? <MdCropSquare size={60} /> : <MdOutlinePlayArrow size={60} />}
        </button>
    )
}

export default ShiftActionButton