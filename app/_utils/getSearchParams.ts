
/**This function reads all search params and returns them as a string so can be attached to an API request to backend server */
export const getSearchParams = (searchParams: { [key: string]: string | string[] | undefined }) => {

    const queryParams = new URLSearchParams()

    for (const key in searchParams) {
        const value = searchParams[key]

        if (Array.isArray(value))
            value.forEach(v => queryParams.append(key, v))
        else if (value !== undefined)
            queryParams.append(key, value)
    }

    return queryParams.toString()
}
