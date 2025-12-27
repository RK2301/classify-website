'use server'

import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"
import { revalidatePath } from "next/cache"

/**Server action to add new manager */
export const addManager = async (id: string) => {

    const axios = await getServerAxios()

    //make API request to add new manager
    return await handleServerAction(async () => {
        await axios('/api/users/managers', {
            method: 'POST',
            data: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //if add sucess then revalidate the managers cache
        revalidatePath('/app/managers')
    })

}