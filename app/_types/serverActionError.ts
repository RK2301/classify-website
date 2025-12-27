import { ErrorResponse } from "../_hooks/use-request";


/**interface describe a error message returned by server action when dealing with Axios error */
export interface ServerActionError {
    status: number;
    response: {
        data: ErrorResponse
    }
}

/**check whenever a given obj is implement ServerActionError interface
 * 
 * which mean it's a error returned by a action server
 */
export const isServerActionError = (obj: unknown): obj is ServerActionError => {
    return (
        typeof obj === 'object' &&
        obj !== null &&

        'status' in obj &&
        typeof obj.status === 'number' &&

        'response' in obj &&
        typeof obj.response === 'object'
    )
}