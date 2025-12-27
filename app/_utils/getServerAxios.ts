import axios from "axios";
import { cookies } from "next/headers";
import { getCurrentLocale } from "./getCurrentLocale";

/**create axios instance to be used on server components
 ** This instance will automatically include the cookies from the request headers
 ** and the host header to match the API URL
 ** In addition, it will use the API_URL environment variable
 * to set the base URL for the API requests.
 */
const getServerAxios = async () => {

    const cookieStore = await cookies()

    const cookiesHeader = cookieStore
        .getAll()
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ')

    const currentLocale = await getCurrentLocale()

    return axios.create({
        baseURL: process.env.API_URL,
        headers: {
            'host': process.env.HOST,
            'cookie': cookiesHeader,
            'accept-language': currentLocale,
        }
    })
}

export default getServerAxios;