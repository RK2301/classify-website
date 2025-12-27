'use server'

import { revalidatePath } from "next/cache"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"

/**This server action handle a request to delete a specific subject
 * 
 * must pass the id for subject want to delete
 */
export const deleteSubject = async (subjectId: number) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios(`/api/subjects/${subjectId}`, {
            method: 'DELETE'
        })

        // revalidate the path for subjects
        revalidatePath('/app/subjects')
    })
}