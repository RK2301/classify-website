'use client'
import useDirection from "@/app/_hooks/use-direction"
import { IconType } from "react-icons/lib"

/**This component receives 2 icons
 * 
 * based on the current direction "ltr" or "rtl" will show the prober icons
 * 
 * must pass the target icon for each direction
 */
const SwapIcon = ({
    ltrIcon,
    rtlIcon
}: {
    /**icon to show when the direction of the app is ltr */
    ltrIcon: React.ReactElement<IconType>,

    /**icon to show when the direction of the is rtl */
    rtlIcon: React.ReactElement<IconType>
}) => {

    const dir = useDirection()

    if (dir === 'ltr')
        return ltrIcon

    return rtlIcon
}

export default SwapIcon