'use client'

import { Actions, can, Resources } from "@rkh-ms/classify-lib/accesscontrol"
import { useSession } from "../_context/SessionProvider"

/**This custom hook check whenever the user have the access to perform such a action on a given resource
 */
export const usePermission = (action: Actions[] | Actions, resource: Resources) => {
    //access user role via useSession hook
    const { session } = useSession()
    const role = session!.role

    const haveAccess = can(role, action, resource)

    return haveAccess
}