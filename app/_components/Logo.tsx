'use client'

import Image from "next/image"

const Logo = () => {

    return (
        <div className="relative h-24 w-full">
            <Image
                src={'/logo.png'}
                alt="Classify"
                fill
                className="object-contain"
            />
        </div>
    )
}

export default Logo