import { useTranslations } from "next-intl"
import { Option } from "@/app/_types/ListOption";


/**This custom hook return classes option as array, for 13 classes options
 * 
 * it can be used for filter based on students classes, or when Add/Update student
 ** e.g. [{label: 'Class 1', value: 1} ....]
 */
export const useClassOptions = (): Option[] => {

    const t = useTranslations()

    return Array.from({ length: 13 }, (_, i) => ({
        label: i === 12
            ? t('graduatesStudents')
            : t('classNumber', { num: i + 1 }),
        value: String(i + 1)
    }))
}

