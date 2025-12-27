import { useRef } from "react"
import useDirection from "./use-direction"

/**Speed of scrolling */
const SCROLL_AMOUNT = 12

/**This hook receive a ref to a div container, and return 2 functions
 * 
 * First one to start scroll automatically on hover (scroll will as long as user hover)
 * by calling setInterval
 * 
 * Second function to stop scrolling when mouse leave the button that trigger scrolling
 */
export const useHoverScroll = (containerRef: React.RefObject<HTMLDivElement | null>) => {

    const appDirection = useDirection()

    /**store the id of interval so later can be deleted */
    const intervalRef = useRef<number | null>(null)

    /**This app start scrolling for start or the container.
     * 
     * start or end of the container determine based on the app current direction (LTR or RTL)
     * 
     * @param dir to which direction to start the scrolling, start of the container or the end
     */
    const startScrolling = (dir: 'start' | 'end') => {
        if (!containerRef.current)
            return;

        // avoid duplicates
        if (intervalRef.current)
            return

        // every 
        intervalRef.current = window.setInterval(() => {

            containerRef.current?.scrollBy({
                behavior: 'smooth',
                /**when the app direction is LTR and want to scroll to the start of container
                 *  then must decrease the value of scrollLeft for the container.
                 *  e.g. from 200 to 70
                 * 
                 * Same when want to scroll to the end of the container and direction is RTL then also must 
                 * decrease the value of scrollLeft the container
                 * e.g. from -100 to -150
                 * 
                 * otherwise must increase the value of scrollLeft
                 * for LTR and want to scroll to the end then must increase scrollLeft
                 * e.g. from 100 to 150
                 * 
                 * for RTL and want to scroll for the start then must increase scrollLeft 
                 * e.g. from -150 to -100
                 */
                left: (dir === 'start' && appDirection === 'ltr') || (dir === 'end' && appDirection === 'rtl')
                    ? -SCROLL_AMOUNT : SCROLL_AMOUNT
            })

        }, 16) // ~60fps

    }


    /**Function to stop the interval for scrolling (no more scrolling)
     * 
     * can be used for event when mouse leave the button that trigger the scrolling.
     */
    const stopScrolling = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    return {
        startScrolling,
        stopScrolling
    }
}