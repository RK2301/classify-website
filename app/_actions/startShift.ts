'use server'

import { revalidatePath } from "next/cache"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { Location } from "@/app/_types/Location"

/**This action is about  make api request to start a new shift */
export const startShift = async (startLocation: Location) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {
        await axios('/api/shifts/start', {
            method: 'POST',
            data: JSON.stringify({ startLocation }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        revalidatePath('/app/shifts')
    })
}