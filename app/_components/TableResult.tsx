'use client'
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

/**This component displays currently results range in the table
 ** e.g. Showing 1 to 10 of 24 results
 ** the component do this by read Page and limit params values
 */
const TableResult = ({
    totalItems
}: {
    totalItems: number
}) => {
    const t = useTranslations()
    const params = useSearchParams()

    const page = Number(params.get('page')) || 1
    const limit = Number(params.get('limit')) || 10

    const from = ((page * limit) - limit) + 1
    const to = Math.min(totalItems, (limit * (page + 1)) - limit)

    return (
        <span className="text-sm md:text-base text-[var(--color-grey-600)]">
            {t('tableResult.showing')} {' '}
            <span className="font-bold">{from}</span> {' '}
            {t('tableResult.to')} <span className="font-bold">{to}</span> {' '}
            {t('tableResult.of')} <span className="font-bold">{totalItems}</span> {' '}
        </span>
    )
}

export default TableResult