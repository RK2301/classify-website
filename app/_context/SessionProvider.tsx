'use client'
import { UserPayload } from "@rkh-ms/classify-lib";
import { createContext, useContext, useState } from "react";

type SessionContextStructure = {
    session?: UserPayload;
    setCurrentSession: (session: UserPayload | undefined) => void
}
const SessionContext = createContext<SessionContextStructure | undefined>(undefined)

/**This provider provide the current user data */
const SessionProvider = ({
    children,
    user
}: {
    children: React.ReactNode,
    user: UserPayload
}) => {
    const [session, setSession] = useState<UserPayload | undefined>(user)
    const setCurrentSession = (se: UserPayload | undefined) => { setSession(se) }

    return (
        <SessionContext.Provider value={{
            session,
            setCurrentSession
        }}>
            {children}
        </SessionContext.Provider>
    )
}

/**custom hook to access current session value
 ** which is current user data
 */
export const useSession = () => {
    const val = useContext(SessionContext)
    if (!val)
        throw new Error('useSession can\'t be called outside SessionProvider')
    return val
}

export default SessionProvider