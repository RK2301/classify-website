import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"

/**This custom hook to simplify working with search params, espically when working with tables */
export const useClassifyCustomSearchParams = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()


    /**this function set a search param to the associated value */
    const setSearchParam = useCallback((key: string, value: string) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()))
        currentParams.set(key, value)

        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false })
    }, [router, pathname, searchParams])


    /**this function accept array of object
     * 
     * each object has key and value enties
     * 
     * based if the key has value then update it in the search params
     * 
     * otherwise remove it from the search params
     */
    const setMultipleParams = useCallback((params: {
        key: string; value: string | undefined
    }[]) => {

        const currentParams = new URLSearchParams(Array.from(searchParams.entries()))

        /**for each key
         * 
         * if the value defined then set the key to the value
         * 
         * if the value undefined then delete the param
         */
        params.forEach(p => {
            if (!p.value)
                currentParams.delete(p.key)
            else
                currentParams.set(p.key, p.value)
        })

        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false })
    }, [searchParams, router, pathname])



    /**this function to return value of certain search param */
    const getSearchParam = useCallback((key: string) => {
        return searchParams.get(key)
    }, [searchParams])


    const deleteSearchParam = useCallback((key: string) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()))
        currentParams.delete(key)

        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false })
    }, [router, pathname, searchParams])

    return {
        setSearchParam,
        setMultipleParams,
        getSearchParam,
        deleteSearchParam
    }
}