'use client'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { HiArrowDown, HiArrowUp } from "react-icons/hi2";


type SortableHeadButtonProps = {
    children: React.ReactNode
    /**id of the sort on the server side
     ** e.g. to sort based on id, must pass 1 in the query params as sort=1 to the server
     */
    sortId: number
}

type sortDirection = 'ASC' | 'DESC'

/**This button to be used inside table for a cell that can be sortable based on it
 ** e.g. ID, name ....
 */
const SortableHeadButton: React.FC<SortableHeadButtonProps> = ({ children,
    sortId
}) => {

    //read sort query params using use params
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()


    const activeId = Number(searchParams.get('sort')) || 1

    //check if the active sort currently is the associated with this button
    const isActive = activeId === sortId

    //what direction is currently the sort based on
    //ASC or DESC
    const sortDir: sortDirection = searchParams.get('sortDir') as sortDirection || 'ASC'

    const handleClick = () => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()))
        let newSortDir: sortDirection | null

        //first check if the sort based on this button isActive 
        //if yes then change direction
        //from ASC -> DESC
        //FROM DESC -> ASC
        if (isActive && sortDir === 'ASC')
            newSortDir = 'DESC'

        if (isActive && sortDir === 'DESC')
            newSortDir = 'ASC'

        //check if this button never clicked
        //so the sort now must be set passed on the column
        //and set sort direction to ASC
        if (!isActive)
            newSortDir = 'ASC'

        //set the new sort direction and sort id to be sorted based on
        currentParams.set('sortDir', newSortDir!)
        currentParams.set('sort', String(sortId))


        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false })
    }

    return (
        <Button
            variant="ghost"
            className="flex items-center justify-center gap-0.5
            [&_svg]:h-2 [&_svg]:w-auto"
            onClick={handleClick}
        >
            {children}

            {isActive && sortDir === 'ASC' && <HiArrowUp />}
            {isActive && sortDir === 'DESC' && <HiArrowDown />}
        </Button>
    )
}

export default SortableHeadButton