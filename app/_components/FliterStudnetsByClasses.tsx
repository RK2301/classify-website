'use client'
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import MultiSelect from "@/app/_components/MultiSelect"
import { Option } from "@/app/_types/ListOption";

import { useClassifyCustomSearchParams } from "../_hooks/useClassifyCustomSearchParams"
import { SearchParams } from "../_utils/SearchParams"

const FilterStudnetsByClasses = () => {

    const t = useTranslations()

    //selected default value will be passed on grades query params
    const [selected, setSelected] = useState<string[]>([])
    const { getSearchParam, setMultipleParams } = useClassifyCustomSearchParams()

    useEffect(() => {
        const grades = getSearchParam('grades')
        if (grades)
            setSelected(grades.split(','))
    }, [])


    const options: Option[] = Array.from({ length: 13 }, (_, i) => ({
        label: i === 12 ? t('graduatesStudents') : t('classNumber', { num: i + 1 }),
        value: String(i + 1)
    }))

    /**function to handle changed value for the grades search params
     * 
     * if one added then wil added to the selected array
     * 
     * otherwise deleted the value
     * 
     ** if array has no values then remove the grades search params
     */
    const onChange = (selected: string[]) => {
        // if (selected.length > 0)
        //     setSearchParam('grades', selected.join(','))
        // else
        //     deleteSearchParam('grades')
        setMultipleParams([{
            key: SearchParams.Page,
            value: '1'
        }, {
            key: SearchParams.Grades,
            value: selected.join(',')
        }])

        setSelected(selected)
    }

    return (
        <MultiSelect
            placeholder={t('selectClassesPlaceholder')}
            searchPlaceholder={t('searchClassesPlaceholder')}
            options={options}
            selected={selected}
            onChange={onChange}
        />
    )
}

export default FilterStudnetsByClasses