'use server'

import { revalidatePath } from "next/cache"
import { TeacherFormFields } from "../_types/formsFields"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"

export const UpdateTeacher = async (teacher: TeacherFormFields) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios(`/api/users/teachers`, {
            method: 'PUT',
            data: JSON.stringify({
                ...teacher,
                startDate: teacher.startDate.toISOString()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // revalidate the path to teachers
        revalidatePath('/app/teachers')
    })
}