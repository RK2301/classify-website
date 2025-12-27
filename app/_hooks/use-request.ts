import axios from "axios";
import { useState } from "react";
import { wrappedErrorToast } from "../_utils/wrappedErrorToast";
import { isServerActionError } from "../_types/serverActionError";


export interface ErrorResponse {
    errors: {
        message: string;
        field?: string;
    }[]
}

interface useRequestOptions<T> {
    onSuccess?: (res?: T) => Promise<unknown> | unknown
    /**if true then throw error after handling it
     ** Good when request beign made after user clicks continue on alert dialog, so toast.promise won't show success toast
     */
    toThrowError?: boolean

    /**Show the error always inside a toast despite the error status code
     * 
     * good when message made not from form and error can be compilcated and realted to some 
     * 
     * request fields
     * 
     * e.g. send request to start a shift when must attach startLocation and error can occur when it's in wrong format
     */
    showErrorInToast?: boolean
}

const useRequest = <T = null>(options: useRequestOptions<T> = {}) => {

    const { onSuccess, toThrowError, showErrorInToast } = options
    const [resErrors, setErrors] = useState<Record<string, string>>({})

    const doRequest = async (action: () => Promise<unknown>) => {

        try {
            setErrors({})
            const res = await action()


            //if the action returned as server action error then thorw to handle it
            if (isServerActionError(res) || res instanceof Error) {
                throw res
            }

            if (onSuccess)
                await onSuccess(res as T)

        } catch (err) {
            console.error(err);

            if (axios.isAxiosError(err) || isServerActionError(err)) {
                const status = isServerActionError(err) ? err.status : err.response?.status
                const error: ErrorResponse = err.response?.data

                if (status === 400) {
                    const errorMessages = error?.errors.reduce((acc, curr) => {
                        acc[curr.field || 'general'] = curr.message;
                        return acc;
                    }, {} as Record<string, string>);

                    //if the errorMessages has general field, then call toast with error
                    if (errorMessages.general)
                        wrappedErrorToast(errorMessages.general);
                    else if (showErrorInToast) {
                        //when user asks to show error in toast then get one of the erros and
                        //display it
                        const keys = Object.keys(errorMessages)
                        wrappedErrorToast(errorMessages[keys[0]])
                    }
                    else
                        setErrors(errorMessages);

                }
                //status ethier than 400
                else {
                    //show a toast with error
                    console.error('Status error code not 400');

                    const err = error?.errors[0]?.message || 'An unexpected error occurred';
                    console.error(err);
                    wrappedErrorToast(err)
                }
            } else if (err instanceof Error) {
                // Handle other types of errors, like network errors
                // console.error(`error message is: ${err.message}`);
                // console.error(`keys of the error: ${Object.keys(err)}`)

                wrappedErrorToast('An unexpected error occurred');
            }

            //if toThrowError then throw the error back
            //good when the request is beign fired after showing alert dialog
            //so the toast.promise will not show success toast
            if (toThrowError)
                throw err
        }
    }

    return { doRequest, resErrors }
}

export default useRequest;