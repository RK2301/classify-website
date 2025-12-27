'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import SwapIcon from "./SwapIcon";
import IconButton from "./IconButton";

type BackButtonProps = {
    /**target href, default is to back one page */
    herf?: string
}

const BackButton: React.FC<BackButtonProps> = ({
    herf
}) => {

    const router = useRouter()

    /**if user doesn't pass href prop then nav back to the previous page */
    const handleClick = () => {
        if (!herf)
            router.back()
    }

    return (
        // <Link
        //     href={herf || '#'}
        //     onClick={handleClick}
        //     className="inline-flex items-center justify-center
        //                 rounded-full p-2
        //                 border border-[var(--color-grey-200)]
        //                 bg-[var(--color-grey-0)]
        //                 shadow-sm
        //                 transform transition-transform duration-300
        //                 hover:brightness-95
        //                 outline-none focus-visible:border-ring focus-visible:ring-brand-500 focus-visible:ring-[3px]

        //                 active:[&_svg]:scale-85
        //                 "
        // >
        //     {dir === 'ltr' ? <HiArrowLeft size={17} />
        //         : <HiArrowRight size={17} />}
        // </Link>

        <Link
            href={herf || '#'}
            onClick={handleClick}
        >
            <IconButton>
                <SwapIcon
                    ltrIcon={<HiArrowLeft size={17} />}
                    rtlIcon={<HiArrowRight size={17} />}
                />
            </IconButton>
        </Link>
    )
}

export default BackButton