'use client'

import { createContext, useContext, useState } from "react"

interface SubjectDrawerContextStructure {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const SubjectDrawerContext = createContext<SubjectDrawerContextStructure | undefined>(undefined)

/**This provider, provide the current state for the subject drawer that will be used for small screens.
 * 
 * For add/ update a subject
 * 
 * The provider, provide the state of the drawer and function to open or close the Drawer
 */
const SubjectDrawerStateProvider = ({ children }: { children: React.ReactNode }) => {

    const [open, setIsOpen] = useState<boolean>(false)

    const onOpenChange = () => {
        setIsOpen(open => !open)
    }

    return (
        <SubjectDrawerContext.Provider
            value={{
                open,
                onOpenChange
            }}
        >
            {children}
        </SubjectDrawerContext.Provider>
    )
}

/**Custom hook to return the value passed by  SubjectDrawerStateProvider
 * 
 * which is the open state and function to change Drawer current state
*/
export const useSubjectDrawerState = () => {
    const value = useContext(SubjectDrawerContext)
    if (!value)
        throw new Error('useSubjectDrawerState can\'nt be called outside SubjectDrawerStateProvider')

    return value
}

export default SubjectDrawerStateProvider