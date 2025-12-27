'use server'

import { revalidatePath } from "next/cache"

import { API } from "@rkh-ms/classify-lib/api"
import { MaterialKeys } from "@rkh-ms/classify-lib/enums"

import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"


/**This server action make a call to update material title and/or description */
export const updateMaterialAction = async (courseId: number,
    materialId: number,
    data: {
        [MaterialKeys.TITLE]: string,
        [MaterialKeys.DESCRIPTION]?: string
    }) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {


        // make request to update the material
        await axios(API.materials.update(materialId), {
            method: 'PATCH',
            data: JSON.stringify({
                ...data,
                /**if description not passed then for the update request, ask the server to 
                 * delete the description (set to null)
                 */
                [MaterialKeys.DESCRIPTION]: data[MaterialKeys.DESCRIPTION] ?
                    data[MaterialKeys.DESCRIPTION] : null
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })


        // after success, revalidate the course page
        revalidatePath(`/app/courses/${courseId}`)
    })
}