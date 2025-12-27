'use server'

import { SubjectKeys } from "@rkh-ms/classify-lib/enums"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import getServerAxios from "../_utils/getServerAxios"
import { handleServerAction } from "../_utils/handleServerAction"
// import { revalidatePath } from "next/cache"

/**This server action make a request to update a exists subject.
 * 
 * 
 * @param subjectId the subject id to update it's values
 * @param subject the new subject values, must relate to new values of he, ar, en
 */
export const UpdateSubject = async (subjectId: number, subject: Pick<Subject, SubjectKeys.HE | SubjectKeys.AR | SubjectKeys.EN>) => {

    const axios = await getServerAxios()

    return await handleServerAction(async () => {

        await axios(`/api/subjects/${subjectId}`, {
            method: 'PUT',
            data: JSON.stringify(subject),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // after success revalidate the subjects route
        // revalidatePath('/app/subjects')
    })

}