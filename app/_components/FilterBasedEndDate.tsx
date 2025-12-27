'use client'

import AnimatedToggleGroup, { ToggleOption } from "@/app/_components/AnimatedToggleGroup"
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams"
import { useTranslations } from "next-intl"
import { SearchParams } from "../_utils/SearchParams"

/**This component render a group toggle button to filter Teacehrs or Managers based on their endDate
 ** All -> all teachers or managers
 ** current -> teachers or managers still in work
 ** former -> teacehrs or managers leave their position
 *
 * the function will update endDate param value accordinly to the selection 
 */
const FilterBasedEndDate = () => {

    const t = useTranslations()
    const {
        setSearchParam,
        deleteSearchParam,
        getSearchParam
    } = useClassifyCustomSearchParams()

    const endDateParam = SearchParams.endDate

    const filterOptions: ToggleOption[] = [
        {
            value: '',
            label: t('filter.all')
        },
        {
            value: 'false',
            label: t('filter.current')
        },
        {
            value: 'true',
            label: t('filter.former')
        }
    ]

    const handleChange = (value: string) => {
        if (!value)
            deleteSearchParam(endDateParam)
        else
            setSearchParam(endDateParam, value)
    }

    return <AnimatedToggleGroup
        options={filterOptions}
        onChange={handleChange}
        defaultValue={getSearchParam(endDateParam) || undefined}
        border
    />

}

export default FilterBasedEndDate