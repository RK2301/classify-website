'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"

/**This server action make a request to get signed URL for a file related to some material
 * 
 * when resolved, a URL returned as string, so can be used to download the file
 */
export const downloadFileAction = async (materialId: number, fileId: number) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        const { data } = await axios(API.materials.downloadFile(materialId, fileId))
        const url = (data as { url: string }).url

        return url
    })
}