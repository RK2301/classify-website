import { Pagination } from "@rkh-ms/classify-lib"
import { useTranslations } from "next-intl"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import useDirection from "@/app/_hooks/use-direction";
import { useClassifyCustomSearchParams } from "../_hooks/useClassifyCustomSearchParams";
import { SearchParams } from "../_utils/SearchParams";


const PaginationControls = ({ pagination }: { pagination: Pagination }) => {

    const { currentPage, totalPages } = pagination
    const { setSearchParam } = useClassifyCustomSearchParams()

    const handleNext = () => {
        setSearchParam(SearchParams.Page, String(currentPage + 1))
    }

    const handlePrev = () => {
        setSearchParam(SearchParams.Page, String(currentPage - 1))
    }

    return (
        <div className="flex flex-row-reverse justify-center items-center gap-1">
            <PaginationButton
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                type='next'
            />

            <PaginationButton
                onClick={handlePrev}
                disabled={currentPage === 1}
                type="prev"
            />
        </div>
    )
}

/**button for pagination
 * can be next button or prev one
 */
const PaginationButton = ({
    disabled,
    onClick,
    type
}: {
    disabled: boolean
    onClick: () => void
    type: 'next' | 'prev'
}) => {
    const dir = useDirection()
    const t = useTranslations()

    return (
        <button
            onClick={onClick}
            className="bg-transparent active:enabled:bg-brand-500
                                hover:enabled:bg-brand-600
                                hover:enabled:text-brand-50  active:enabled:text-brand-50  text-inherit
                                disabled:opacity-30
                                 border-none rounded-sm
                                 font-medium text-sm
                                 flex items-center justify-center gap-1
                                 py-1.5 px-2 md:px-4
                                 transition-all duration-300
                                 [&_svg]:h-4 [&_svg]:w-auto"
            disabled={disabled}
        >
            {type === 'next' ? (
                <>
                    {t('next')}
                    {dir === 'ltr' ? <HiChevronRight /> : <HiChevronLeft />}
                </>
            ) : (<>
                {dir === 'ltr' ? <HiChevronLeft /> : <HiChevronRight />}
                {t('prev')}
            </>)}
        </button>
    )
}

export default PaginationControls