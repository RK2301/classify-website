import { getCurrentUser } from "@/app/_utils/getCurrentUser"
import { Actions, can, Resources } from "@rkh-ms/classify-lib/accesscontrol"
import { UserRole } from "@rkh-ms/classify-lib"

type RestrictedServerProps = {
    action: Actions | Actions[],
    resource: Resources,
    children: React.ReactNode,
    onNotHaveAccess?: () => void
}


/**A Restricted version to be used on the server side
 * @prop onNotHaveAccess a function to be called when a user don't have access.
 * 
 * can be used for instance to redirect the user if try to access a certain page not authorized to access
 */
const RestrictedServer: React.FC<RestrictedServerProps> = async ({
    action,
    resource,
    children,
    onNotHaveAccess
}) => {

    //get current user data
    const user = await getCurrentUser()

    //check if user has access
    const hasAccess = can(user ? user.role : '' as UserRole, action, resource)

    // if user don't have access to perform action on given resource
    //then call a function to perform a action (if passed by the user)
    //maybe like redirect the user
    if (!hasAccess && onNotHaveAccess)
        onNotHaveAccess()

    if (hasAccess)
        return children
    return <></>
}

export default RestrictedServer