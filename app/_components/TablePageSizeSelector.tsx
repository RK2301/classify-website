'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams"


/**This component shows a select list to choose numbers of rows to display per page, in the table
 ** can be 5, 10(default) or 15
 */
const TablePageSizeSelector = () => {
    const t = useTranslations()
    const { setSearchParam, getSearchParam } = useClassifyCustomSearchParams()

    const limit = getSearchParam('limit') || '10'

    const handleChange = (value: string) => {
        //change the limit search param to the new value
        setSearchParam('limit', value)
    }

    return (
        <div className="flex items-center gap-2 text-[var(--color-grey-600)]">
            <span>{t('tableResult.showing')}</span>

            <Select
                defaultValue={limit}
                onValueChange={handleChange}
            >
                <SelectTrigger size="sm">
                    <SelectValue placeholder='theme' />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value='5'>5</SelectItem>
                    <SelectItem value='10'>10</SelectItem>
                    <SelectItem value='15'>15</SelectItem>
                </SelectContent>
            </Select>

            <span>{t('tableResult.results')}</span>
        </div>
    )

}

export default TablePageSizeSelector