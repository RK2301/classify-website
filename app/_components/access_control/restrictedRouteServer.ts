import { getCurrentUser } from "@/app/_utils/getCurrentUser";
import { Actions, Resources, can } from "@rkh-ms/classify-lib/accesscontrol";
import { redirect } from "next/navigation";

/**This function to be called inside server components to protect the access for this route for
 * certain user that have the access
 * 
 * if they don't have the access then will redirect to the home page
 */
export const restrictedRouteServer = async (action: Actions | Actions[], resource: Resources) => {

    //get current user data
    const user = await getCurrentUser()

    const haveAccess = can(user!.role, action, resource)
    if (!haveAccess)
        redirect('/app')
}