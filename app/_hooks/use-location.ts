'use client'
import { useEffect, useState } from "react"
import { Location } from "@/app/_types/Location"
import { wrappedErrorToast } from "@/app/_utils/wrappedErrorToast"
import { useTranslations } from "next-intl"



/**This custom hook to retrieve current user location */
export const useLocation = () => {
    const [location, setLocation] = useState<Location | null>(null)
    const [error, setError] = useState<string>()

    const t = useTranslations()

    /**when error occured during access user location show error toast with the reason
     * 
     * e.g. permission denied, error access location ....
     */
    useEffect(() => {
        if (error)
            wrappedErrorToast(error)
    }, [error])

    /**function asks for user location, if denied or error occured then will set to error
     * 
     * if success then location will updated
     * 
     * @param onSuccess when access user location success and a onSuccess function passed, then will be called with the new location
     */
    const getLocation = (onSuccess?: (location: Location) => unknown) => {

        // reset the eror
        setError(undefined)

        if (!navigator.geolocation)
            setError(t('locationNotSupported'))
        else
            navigator.geolocation.getCurrentPosition(position => {
                const currPosition: Location = [position.coords.longitude, position.coords.latitude]
                setLocation(currPosition)

                //if on success function passed then call it
                if (onSuccess)
                    onSuccess(currPosition)
            }, (err) => {
                //error found then set it to the error state
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setError(t('locationAccessRequired'))
                        break;

                    case err.POSITION_UNAVAILABLE:
                        setError(t('locationUnavailable'))
                        break;

                    case err.TIMEOUT:
                        setError(t('locationTimeout'))
                        break;
                }

            }, {
                enableHighAccuracy: true
            })
    }

    return { getLocation, location, error }
}