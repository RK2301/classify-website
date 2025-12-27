'use server'

import { TeacherFormFields } from "@/app/_types/formsFields"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { revalidatePath } from "next/cache"

/**Server action to add a new teacher */
export const AddTeacher = async (teacher: TeacherFormFields) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios('/api/users/teachers', {
            method: 'POST',
            data: JSON.stringify({
                ...teacher,
                startDate: teacher.startDate.toISOString()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // revalidate the teachers path after success
        revalidatePath('/app/teachers')
    })

}