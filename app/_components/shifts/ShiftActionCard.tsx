import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { FaExclamation } from "react-icons/fa"
import { Shift } from "@rkh-ms/classify-lib"
import ShiftActionButton from "./ShiftActionButton"
import ShiftStats from "./ShiftStats"
import { getTranslations } from "next-intl/server"

type ShiftActionCard = {
    currentShift: Shift | undefined
}

const ShiftActionCard: React.FC<ShiftActionCard> = async ({ currentShift }) => {

    const t = await getTranslations()

    /**is there a shift active riht now */
    const isShiftActive = !!currentShift

    console.log(currentShift);

    return (
        <div className="flex justify-center w-full">
            <div className="basis-full lg:basis-4/5 bg-[var(--color-grey-0)] rounded-md
                flex flex-col justify-center items-center gap-3
                p-3 relative">

                <div className="p-2 absolute top-1 right-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <FaExclamation className="text-[var(--color-grey-600)]" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="font-semibold"> {t('locationAccessRequired')} </span>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <div className="flex flex-col justify-center items-center gap-0.5">
                    <ShiftActionButton isShiftActive={isShiftActive} id={currentShift?.id} />
                    <span>
                        {isShiftActive ? t('endShift') : t('startShift')}
                    </span>
                </div>


                <ShiftStats isShiftActive={isShiftActive} startTime={currentShift?.startTime} />
            </div>
        </div>

    )
}

export default ShiftActionCard