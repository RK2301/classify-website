import { HiArrowLeft, HiArrowRight } from "react-icons/hi2"
import { MdRemove } from "react-icons/md"

import { convertUTCtoLocal } from "@/app/_utils/date-helpers"
import { ShiftQuery } from "@rkh-ms/classify-lib"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"
import ShiftDuration from "./ShiftDuration"
import RestrictedServer from "../access_control/RestrictedServer"
import ShiftActions from "@/app/_components/shifts/ShiftActoins"
import SwapIcon from "../SwapIcon"

interface ShiftDetailsProps {
    shift: ShiftQuery
}

/**This component show shift details in Shift Report 
 * 
 * shift details shown relative to given day at the month
 */
const ShiftDetails: React.FC<ShiftDetailsProps> = ({ shift }) => {

    const {
        startTime,
        endTime,
        User: {
            firstName,
            lastName
        }
    } = shift


    return (
        <div
            className="flex items-center justify-between gap-4.5"
        >
            {/**grid grid-cols-[repeat(auto-fit,minmax(0,30%))] */}
            <div className="basis-11/12
            flex lg:basis-3/4 lg:flex-row lg:items-center flex-wrap 
            gap-0.5 lg:gap-3
            flex-col
            ">

                <RestrictedServer
                    action={Actions.readAny}
                    resource={Resources.Shift}
                >
                    <span className="basis-1/3">{firstName + ' ' + lastName}</span>
                </RestrictedServer>

                <div className="flex lg:basis-1/2 items-center gap-2
                text-[var(--color-grey-600)] lg:text-inherit">
                    <div className="flex gap-2 items-center lg:basis-3/5">
                        <span>{convertUTCtoLocal(startTime).format('HH:mm')}</span>

                        <SwapIcon
                            rtlIcon={<HiArrowLeft className="text-[var(--color-grey-400)]" />}
                            ltrIcon={<HiArrowRight className="text-[var(--color-grey-400)]" />}
                        />

                        <span>{endTime ? convertUTCtoLocal(endTime).format('HH:mm') : <MdRemove />}</span>
                    </div>

                    <ShiftDuration startTime={startTime} endTime={endTime} />
                </div>

            </div>

            {/**show dropdown menu */}
            <div>
                <ShiftActions shift={shift} />
            </div>

        </div>
    )
}


export default ShiftDetails