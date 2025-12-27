import { API } from "@rkh-ms/classify-lib/api"
import { MdGroupOff } from "react-icons/md"

import List from "@/app/_components/List"
import { Attendances } from "@/app/_types/queriesTypes"
import getServerAxios from "@/app/_utils/getServerAxios"
import AttendanceItem from "@/app/_components/courses/course_details/attendance/AttendanceItem"
import WrappedEmpty from "@/app/_components/WrappedEmpty"
import { getTranslations } from "next-intl/server"



/**This component make API request to fetch attendance for specific lesson
 * 
 * and display the attendance in a list
 */
const AttendanceList = async ({ lessonId }: { lessonId: number }) => {

    const t = await getTranslations()

    const axios = await getServerAxios()
    const { data } = await axios(API.attendance.getAttendance(lessonId))

    const attendances = data as Attendances[]

    // if no students found to report attendance then show empty message
    if (attendances.length === 0)
        return <WrappedEmpty
            Icon={MdGroupOff}
            title={t('noStudentsAttendanceTitle')}
            description={t('noStudentsAttendanceDescription')}
        />

    return (
        <div className="w-full 2xl:px-7">
            <List>
                {attendances.map(attendance =>
                    <AttendanceItem
                        // when lesson changes, lessonId will be different so react will remount the component
                        // and reset the state
                        key={attendance.id + lessonId}
                        attendance={attendance}
                        lessonId={lessonId}
                        courseId={1}
                    />
                )}
            </List>
        </div>
    )
}


export default AttendanceList