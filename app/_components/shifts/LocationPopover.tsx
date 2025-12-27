'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ShiftQuery } from "@rkh-ms/classify-lib"
import LocationMap from "./LocationMap"
import { useIsMobile } from "@/app/_hooks/use-mobile"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { convertUTCtoLocal } from "@/app/_utils/date-helpers"

interface LocationPopoverProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    shift: ShiftQuery
}


const LocationPopover: React.FC<LocationPopoverProps> = ({ open, onOpenChange, shift }) => {

    const isMobile = useIsMobile()

    const {
        startTime,
        User: {
            firstName,
            lastName
        }
    } = shift

    if (isMobile)
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTitle></DrawerTitle>

                <DrawerContent className="p-1.5">
                    <div className="flex flex-col gap-3">

                        <div className="flex justify-between items-center gap-3
                        px-1">
                            <span>{firstName + ' ' + lastName}</span>

                            <div className="flex items-center gap-1.5">
                                <span>{convertUTCtoLocal(startTime).format('DD/MM HH:mm')}</span>
                            </div>
                        </div>

                        <LocationMap
                            startLocation={shift.startLocation.coordinates}
                            endLocation={shift.endLocation?.coordinates}
                        />

                    </div>
                </DrawerContent>
            </Drawer>
        )

    return (
        <Popover open={open} onOpenChange={onOpenChange} modal>
            <PopoverTrigger asChild>
                <span />
            </PopoverTrigger>

            <PopoverContent className="p-2">
                <LocationMap
                    startLocation={shift.startLocation.coordinates}
                    endLocation={shift.endLocation?.coordinates}
                />
            </PopoverContent>
        </Popover>
    )
}

export default LocationPopover