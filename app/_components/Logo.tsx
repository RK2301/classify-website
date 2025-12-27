'use client'
const Logo = () => {

    return (
        <div className="relative h-24 w-full">
            {/* <Image
                src={'/logo.png'}
                alt="Classify"
                fill
                className="object-contain"
                priority
            /> */}

             <img
                src={"/logo.png"}
                alt="Logo"
                className="h-24 w-full object-contain"
            />
        </div>
    )
}

export default Logo