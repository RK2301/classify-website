'use client'

import { convertUTCtoLocal } from "@/app/_utils/date-helpers"
import { MdRemove } from "react-icons/md"

import { Separator } from "@/components/ui/separator"
import { useDuration } from "./useDuration"
import React from "react"
import { useTranslations } from "next-intl"

const ShiftStats = ({
    isShiftActive,
    startTime
}: {
    /**whenever there is active shift right now */
    isShiftActive: boolean,

    /**start time of the shift */
    startTime?: string
}) => {

    const t = useTranslations()
    const duration = useDuration(startTime)

    const shiftStats = [{
        title: t('startTime'),
        value: isShiftActive && startTime ? convertUTCtoLocal(startTime).format('HH:mm:ss') : null
    }, {
        title: t('duration'),
        value: isShiftActive ? duration : null
    }]

    return (
        <div className="flex items-center justify-center gap-4">
            {shiftStats.map((s, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-[var(--color-grey-600)]">{s.title}</span>
                        <span>{s.value ? s.value : <MdRemove />}</span>
                    </div>

                    {/**if current item isn't the last then show separator */}
                    {index !== shiftStats.length - 1 && <Separator orientation='vertical' className="h-1/2" />}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ShiftStats