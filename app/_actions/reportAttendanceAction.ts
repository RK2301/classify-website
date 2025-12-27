'use server'

import { AttendanceKeys, AttendanceStatus } from "@rkh-ms/classify-lib/enums"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { API } from "@rkh-ms/classify-lib/api"

/**This action report attendance for specific student in specific lesson */
export const reportAttendanceAction = async (courseId: number, lessonId: number
    , studentId: string, status: AttendanceStatus) => {


    const axios = await getServerAxios()

    return handleServerAction(async () => {

        await axios(API.attendance.reportAttendance(lessonId, studentId), {
            method: 'PUT',
            data: {
                [AttendanceKeys.STATUS]: status
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })

    })
}