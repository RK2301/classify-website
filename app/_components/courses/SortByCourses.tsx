'use client'

import { useTranslations } from "next-intl"
import { useState } from "react"
import { HiArrowsUpDown } from "react-icons/hi2";


import useDirection from "@/app/_hooks/use-direction"
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams"
import { SearchParams } from "@/app/_utils/SearchParams"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sort } from "@rkh-ms/classify-lib/enums"


/**This component shows a list to select based on which attribute (title, start date, end date)
 * to sort the courses
 */
const SortByCourses = () => {

    const t = useTranslations()
    const dir = useDirection()

    const { setMultipleParams, getSearchParam } = useClassifyCustomSearchParams()
    const sortedBy = Number(getSearchParam(SearchParams.sort)) || 1
    const sortDir = getSearchParam(SearchParams.SortDir) as Sort || Sort.DESC


    const options = [
        {
            value: 1,
            label: t('sortStartDateDESC'),
            dir: Sort.DESC
        },
        {
            value: 1,
            label: t('sortStartDateASC'),
            dir: Sort.ASC
        },
        {
            value: 2,
            label: t('sortEndDateDESC'),
            dir: Sort.DESC
        },
        {
            value: 2,
            label: t('sortEndDateASC'),
            dir: Sort.ASC
        },
        {
            value: 3,
            label: t('sortTitleASC'),
            dir: Sort.ASC
        },
        {
            value: 3,
            label: t('sortTitleDESC'),
            dir: Sort.DESC
        }
    ]

    const selectedOption = options.findIndex(option => option.value === sortedBy &&
        option.dir === sortDir
    )

    const [selected, setSelected] = useState<number>(selectedOption)


    /**Handle event when user select a new value to sort courses based on */
    const handleSelected = (value: string) => {
        const index = Number(value)

        /**get the new value to sort courses based on from the options array
         * if index out of range then fallback to the first option (sort based on start date)
         */
        const sortOption = options[index] || options[0]

        // set the search params to value and direction for sort
        setMultipleParams([{
            key: SearchParams.sort,
            value: String(sortOption.value)
        }, {
            key: SearchParams.SortDir,
            value: sortOption.dir
        }])

        // set selected to the new value
        setSelected(index)
    }

    return (
        <Select
            dir={dir}
            value={String(selected)}
            onValueChange={handleSelected}
        >
            <SelectTrigger className='w-full'>
                <SelectValue placeholder={'select'} />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>
                        <div className="flex items-center gap-1.5">
                            <HiArrowsUpDown size={17} />
                            <span>{t('sortBy')}</span>
                        </div>
                    </SelectLabel>

                    {options.map((option, index) => (
                        <SelectItem
                            key={index}
                            value={String(index)}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SortByCourses;