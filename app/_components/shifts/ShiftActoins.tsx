'use client'

import { useTranslations } from "next-intl"
import { useState } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { MdDeleteOutline, MdLogout, MdOutlineAccessTime } from "react-icons/md"
import { ShiftQuery } from "@rkh-ms/classify-lib"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"
import { UserRole } from '@rkh-ms/classify-lib/enums'

import LocationPopover from "@/app/_components/shifts/LocationPopover"
import UpdateShift from "@/app/_components/shifts/UpdateShift"
import Restricted from "@/app/_components/access_control/Restricted"
import EndShift from "@/app/_components/shifts/EndShift"
import DeleteShift from "@/app/_components/shifts/DeleteShift"
import WrappedDropdown, { WrappedDropdownMenuItem } from "@/app/_components/WrappedDropdown"
import { useSession } from "@/app/_context/SessionProvider"
import { convertUTCtoLocal } from "@/app/_utils/date-helpers"
import dayjs from "dayjs"

interface ShiftActionsProps {
    shift: ShiftQuery
}

const ShiftActions: React.FC<ShiftActionsProps> = ({ shift }) => {

    const [locationOpen, setIsLocationOpen] = useState<boolean>(false)
    const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false)

    /**control the alert dialog */
    const [endShiftDialogOpen, setEndShiftDialogOpen] = useState<boolean>(false)

    /**control the delete shift dialog */
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    const t = useTranslations()

    console.log(UserRole.Manager);


    const { session } = useSession()

    // calculate if delete option for teacher must be disabled
    // option should be disabled for shifts not in the current month
    // e.g. if it's Septemper then all shift from Auguest and backward should be disabled
    const isDeleteDisabled = session?.role !== UserRole.Manager &&
        dayjs().startOf('month') > convertUTCtoLocal(shift.startTime)

    return (
        <>
            <WrappedDropdown
                stillOpen={locationOpen}
            >
                <Restricted
                    action={Actions.readAny}
                    resource={Resources.Shift}
                >
                    <WrappedDropdownMenuItem
                        onClick={() => setIsLocationOpen(true)}
                        label={t('map')}
                        Icon={FaMapMarkerAlt}
                    />


                    {shift.endTime &&
                        <WrappedDropdownMenuItem
                            onClick={() => setUpdateDialogOpen(true)}
                            Icon={MdOutlineAccessTime}
                            label={t('updateHours')}
                        />
                    }

                    {!shift.endTime &&
                        <WrappedDropdownMenuItem
                            onClick={() => setEndShiftDialogOpen(true)}
                            Icon={MdLogout}
                            label={t('endShift')}
                        />
                    }
                </Restricted>


                <WrappedDropdownMenuItem
                    onClick={() => setDeleteDialogOpen(true)}
                    Icon={MdDeleteOutline}
                    label={t('delete')}
                    disabled={isDeleteDisabled}
                    danger
                />

            </WrappedDropdown>

            <LocationPopover
                open={locationOpen}
                onOpenChange={setIsLocationOpen}
                shift={shift}
            />

            {/**user can update shift when shift already ended */}
            {shift.endTime &&
                <UpdateShift
                    open={updateDialogOpen}
                    onOpenChange={setUpdateDialogOpen}
                    shift={shift}
                />
            }

            {!shift.endTime &&
                <EndShift
                    open={endShiftDialogOpen}
                    setIsOpen={setEndShiftDialogOpen}
                    shiftId={shift.id}
                />
            }

            <DeleteShift
                shiftId={shift.id}
                open={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
            />
        </>

    )
}

export default ShiftActions