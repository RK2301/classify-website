'use server'

import { MaterialKeys } from "@rkh-ms/classify-lib/enums"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
import { API } from "@rkh-ms/classify-lib/api"
import { revalidatePath } from "next/cache"

interface AddMaterialForm {
    [MaterialKeys.TITLE]: string,
    [MaterialKeys.DESCRIPTION]?: string,
    [MaterialKeys.COURSE_ID]: number,
    files: FileList
}


/**This request to make a request to add a new material */
export const addMaterialAction = async (data: AddMaterialForm) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        // create a form data to sent to the server
        const formData = new FormData()

        // append the values
        formData.append(MaterialKeys.TITLE, data[MaterialKeys.TITLE])

        if (data[MaterialKeys.DESCRIPTION])
            formData.append(MaterialKeys.DESCRIPTION, data[MaterialKeys.DESCRIPTION])

        // append the files to the request body
        Array.from(data.files).forEach(file => formData.append('files', file))

        // append course id
        formData.append(MaterialKeys.COURSE_ID, String(data[MaterialKeys.COURSE_ID]))

        await axios(API.materials.add, {
            method: 'POST',
            data: formData
        })

        // after success, revalidate the course page
        revalidatePath(`/app/courses/${data[MaterialKeys.COURSE_ID]}`)
    })
}