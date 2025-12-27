'use client'

import { useLocale } from "next-intl"

/**This custom hook return current direction of the app based on the current language */
const useDirection = () => {
    const locale = useLocale()

    if (locale === 'en')
        return 'ltr'
    return 'rtl'
}

export default useDirection