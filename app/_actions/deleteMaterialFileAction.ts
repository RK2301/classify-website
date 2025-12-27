'use server'

import { revalidatePath } from "next/cache"

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "@/app/_utils/getServerAxios"
import { handleServerAction } from "@/app/_utils/handleServerAction"


/**This action make a request to delete some file related to a material */
export const deleteMaterialFileAction = async (courseId: number
    , materialId: number, fileId: number) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios(API.materials.deleteFile(materialId, fileId), {
            method: 'DELETE'
        })

        // after successfully delete the file, revalidate the course path
        revalidatePath(`/app/courses/${courseId}`)
    })
}
