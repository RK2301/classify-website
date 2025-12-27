import { UserPayload } from "@rkh-ms/classify-lib"
import { headers } from "next/headers"

export const getCurrentUser = async () => {
    const hdr = await headers()
    const userHeader = hdr.get('x-user')

    if (!userHeader)
        return null

    //decode the user header
    try {
        const user = JSON.parse(decodeURIComponent(userHeader)) as UserPayload
        return user
    } catch (err) {
        console.error("Error parsing user header:", err)
        return null
    }
}