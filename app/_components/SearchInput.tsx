'use client'

import { Input } from "@/components/ui/input"
import { useClassifyCustomSearchParams } from "../_hooks/useClassifyCustomSearchParams"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

interface SearchInputProps {
    /**When search input should be disabled */
    disabled?: boolean
}

/**This component render a search bar to search users in the table based on their names.
 * 
 * or any table, list
 */
const SearchInput: React.FC<SearchInputProps> = ({ disabled }) => {

    const [searchInput, setSearchInput] = useState<string | undefined>()
    const { setSearchParam, getSearchParam, deleteSearchParam } = useClassifyCustomSearchParams()
    const t = useTranslations()

    //debounce effect
    //if user write before the timeout then the timer will reset
    //if user stops writing then after timer end, search params will be updated to the new value
    useEffect(() => {
        //if the search input empty as first render or
        //the user delete everything, we need to make sure to delete the 
        //search param
        if (!searchInput) {
            const search = getSearchParam('search')
            if (search)
                deleteSearchParam('search')
        } else {
            //now we will debounce the update of the search params 
            //so willn't overwhelem the server with requests
            const timerId = setTimeout(() => {
                setSearchParam('search', searchInput)
            }, 700)

            return () => clearTimeout(timerId)
        }
    }, [searchInput, getSearchParam, setSearchParam, deleteSearchParam])

    return (
        <Input
            type='text'
            placeholder={t('searchTable')}
            onChange={e => setSearchInput(e.target.value)}
            value={searchInput}
            disabled={disabled}
        />
    )
}

export default SearchInput