'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { revalidatePath } from "next/cache"

/**This server action will make request to delete a specific material */
export const deleteMaterialAction = async (courseId: number, materialId: number) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        // first make request to delete the material
        await axios(API.materials.deleteMaterial(materialId), {
            method: 'DELETE'
        })

        // after success, invalid the cache for course page
        revalidatePath(`/app/courses/${courseId}`)
    })
}