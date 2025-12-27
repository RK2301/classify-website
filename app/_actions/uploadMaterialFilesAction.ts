'use server'

import { API } from "@rkh-ms/classify-lib/api"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { revalidatePath } from "next/cache"

/**This server action make request to upload more files for a given material */
export const uploadMaterialFilesAction = async (courseId: number, materialId: number, files: FileList) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        //  first make form data and attach files to it
        const formData = new FormData()

        //  append the files to the request body
        Array.from(files).forEach(file => formData.append('files', file))

        //  first make request to upload more files
        await axios(API.materials.update(materialId), {
            method: 'PATCH',
            data: formData
        })

        //  after success, revalidate the course page
        revalidatePath(`/app/courses/${courseId}`)
    })
}