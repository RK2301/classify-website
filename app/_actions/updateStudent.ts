'use server'

import { StudnetFormFields } from "@/app/_types/formsFields"
import getServerAxios from "../_utils/getServerAxios"
import { revalidatePath } from "next/cache"
import { handleServerAction } from "../_utils/handleServerAction"

export const updateStudnet = async (formData: StudnetFormFields) => {

    const serverAxios = await getServerAxios()

    return await handleServerAction(async () => {
        //make API request to update the student data
        await serverAxios('/api/users/students', {
            method: 'PUT',
            data: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        revalidatePath('/app/students')
    })

}