'use server'

import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import { revalidatePath } from "next/cache"

/**This function make a request to add a new subject
 * 
 * for that must pass the subject data
 */
export const AddShift = async (subject: Omit<Subject, 'version' | 'id'>) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios('/api/subjects', {
            method: 'POST',
            data: JSON.stringify(subject),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // revalidate the path to subjects
        revalidatePath('/app/subjects')
    })
}