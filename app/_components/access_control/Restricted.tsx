'use client'
import { usePermission } from "@/app/_hooks/use-permission"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

type RestrictedProps = {
    action: Actions | Actions[],
    resource: Resources,
    children: React.ReactNode
}

/**This componnet used to restrict access for user to some UI elements based on it's role
 * 
 * @example
 * // Only managers and teachers can see the “Shifts” link 
    <Restricted
        actions={[Actions.readAny, Actions.readOwn]}
        resource={Resources.Shift}
    >
        <Link href="/shifts">Shifts</Link>
    </Restricted>
    */
const Restricted: React.FC<RestrictedProps> = ({
    action,
    resource,
    children
}) => {
    const hasAccess = usePermission(action, resource)

    if (hasAccess)
        return children
    return null
}

export default Restricted