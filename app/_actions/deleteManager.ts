'use server'

import { revalidatePath } from "next/cache"
import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"

/**This server action make API call to delete a manager (set it's end date to current date
 * @param id - id of the manager to be deleted
*/
export const deleteManager = async (id: string) => {

    const axios = await getServerAxios()

    //make API request to delete the manager
    return await handleServerAction(async () => {

        await axios(`/api/users/managers/${id}`, {
            method: 'DELETE'
        })

        //ivalidate the cache for the managers
        revalidatePath('/app/managers')
    })


}