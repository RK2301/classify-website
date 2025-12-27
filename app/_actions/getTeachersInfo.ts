'use server'

import { UserAttributes } from "@rkh-ms/classify-lib"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { Option } from "../_types/ListOption"

/**function to fetch teachers data to be displayed in the list
 * 
 * to be used to filter shifts based on teacher
 */
const getTeacherInfo = async () => {

    const axios = await getServerAxios()

    return await handleServerAction(async (): Promise<Option[]> => {

        const res = await axios('/api/shifts/teachers-info')
        const teachers = res.data as UserAttributes[]

        //convert the teachers data into options
        return teachers.map(teacher => ({
            value: teacher.id,
            label: teacher.firstName + ' ' + teacher.lastName
        }))
    })
}

export default getTeacherInfo