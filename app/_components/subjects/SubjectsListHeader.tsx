'use client'

import { Separator } from "@/components/ui/separator"
import SearchInput from "../SearchInput"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams"
import { SearchParams } from "@/app/_utils/SearchParams"
import { useSubjectDrawerState } from "@/app/_context/SubjectDrawerState"

/**This component shows the header for subjects list
 * 
 * in other word it show's the search bar and add subject button
 */
const SubjectsListHeader = () => {

    const t = useTranslations()
    const { getSearchParam, deleteSearchParam } = useClassifyCustomSearchParams()

    const { onOpenChange } = useSubjectDrawerState()

    /**When add button clicked then make sure to remove the subject id from the URL
     * 
     * and open the drawer for small screens
     * 
     * so can move to add subject form
     */
    const handleAdd = () => {

        if (getSearchParam(SearchParams.SubjectId))
            deleteSearchParam(SearchParams.SubjectId)

        // open the drawer
        onOpenChange(true)
    }

    return (
        <div className="flex flex-col items-center gap-2 pt-1
             sticky top-0 bg-[var(--color-grey-100)]">

            <div className="flex items-center justify-between gap-2 w-full">
                <div className="basis-3/4">
                    <SearchInput />
                </div>

                <div className="grow">
                    <Button onClick={handleAdd}>
                        {t('add')}
                    </Button>
                </div>
            </div>

            <Separator variant='light' />
        </div>
    )
}

export default SubjectsListHeader