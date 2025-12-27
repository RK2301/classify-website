'use server'

import axios from 'axios'

import { StudnetFormFields } from "@/app/_types/formsFields"
import getServerAxios from "@/app/_utils/getServerAxios";
import { ServerActionError } from "@/app/_types/serverActionError";
import { ErrorResponse } from "@/app/_hooks/use-request";
import { revalidatePath } from 'next/cache';

export const addStudentAction = async (formData: StudnetFormFields) => {

    //create api request to add a new student
    // console.log(formData);

    const serverAxios = await getServerAxios()

    try {

        await serverAxios('/api/users/students', {
            method: 'POST',
            data: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        revalidatePath('/app/students')

    } catch (err) {
        console.error(err);

        if (axios.isAxiosError(err)) {
            const actionErr: ServerActionError = {
                status: err.response?.status as number,
                response: {
                    data: err.response?.data as ErrorResponse
                }
            }
            return actionErr
        }
        return err as Error
    }
} 