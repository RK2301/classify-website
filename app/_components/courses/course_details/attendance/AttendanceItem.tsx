'use client'

import { useState, useTransition } from "react"
import { MdAccessTime, MdCheck, MdClose } from "react-icons/md"

import { AttendanceStatus } from "@rkh-ms/classify-lib/enums"

import Avatar from "@/app/_components/Avatar"
import List from "@/app/_components/List"
import { Attendances } from "@/app/_types/queriesTypes"
import { Button } from "@/components/ui/button"
import useRequest from "@/app/_hooks/use-request"
import { reportAttendanceAction } from "@/app/_actions/reportAttendanceAction"


/**3 options data, to report attendance
 * 
 * Attend, Late, Absent
 */
const options = [{
    value: AttendanceStatus.Attend,
    Icon: MdCheck,
    color: 'green-400/60'
}, {
    value: AttendanceStatus.Late,
    Icon: MdAccessTime,
    color: 'yellow-400/60'
}, {
    value: AttendanceStatus.Absent,
    Icon: MdClose,
    color: 'red-400/60'
}]


const textColors: Record<AttendanceStatus, string> = {
    [AttendanceStatus.Attend]: 'text-green-400/60',
    [AttendanceStatus.Late]: 'text-yellow-400/60',
    [AttendanceStatus.Absent]: 'text-red-400/60'
}


const AttendanceItem = ({
    attendance,
    courseId,
    lessonId
}: {
    attendance: Attendances,
    courseId: number,
    lessonId: number
}) => {

    const defaultStatus = attendance.Attendances[0] ? attendance.Attendances[0].status : undefined
    const [status, setStatus] = useState<AttendanceStatus | undefined>(defaultStatus)

    const [pending, startTransition] = useTransition()
    const { doRequest } = useRequest({
        toThrowError: true,
        showErrorInToast: true
    })

    const firstName = attendance.firstName
    const lastName = attendance.lastName
    const studentName = attendance.firstName + ' ' + attendance.lastName


    const handleOnChange = (value: AttendanceStatus) => {

        const currentStatus = status

        // if user click in the selected status, then will be deselected
        setStatus(value)

        // start transition to report attendance
        startTransition(async () => {
            try {
                await doRequest(() => reportAttendanceAction(courseId, lessonId, attendance.id, value))
            } catch (err) {
                console.error('doRequest throw error');

                console.error(err);

                // on error revert status to previous value
                setStatus(currentStatus)
            }
        })
    }


    return (
        <List.ListItem
            key={attendance.id}
            className="py-2 px-4">
            <div className="flex items-center justify-between gap-2.5">

                {/**user avatar + name */}
                <div className="flex items-center gap-1">
                    <Avatar firstName={firstName} lastName={lastName} />
                    <span>{studentName}</span>
                </div>


                {/**attendance group buttons */}
                <div className="w-fit">

                    <div className="grid grid-cols-3 gap-0.5">

                        {options.map((option, index) => {

                            // check if current option selected
                            const selected = status === option.value

                            return (
                                <Button
                                    key={index}
                                    variant={'ghost'}
                                    onClick={() => handleOnChange(option.value)}
                                    // if pending disable all buttons (to wait until request finish)
                                    disabled={pending}
                                    className={`px-2! ${textColors[option.value]} ${selected ?
                                        `bg-${option.color} hover:bg-${option.color} text-inherit` : ``}`}
                                >
                                    <option.Icon className="size-5" />
                                </Button>
                            )
                        })}

                    </div>
                </div>

            </div>
        </List.ListItem>
    )
}

export default AttendanceItem