import axios from "axios";
import { ServerActionError } from "@/app/_types/serverActionError";
import { ErrorResponse } from "@/app/_hooks/use-request";


export const handleServerAction = async <T>(action: () => Promise<T>) => {

    try {
        const res = await action()
        return res

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