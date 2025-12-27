'use client'

import { cn } from "@/lib/utils"

type ChipProps = {
    children: React.ReactNode
    onClick?: () => void | Promise<unknown>,
    variant?: keyof typeof variants
}

const variants = {
    default: 'bg-brand-500 text-white hover:bg-brand-600',
    secondary: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-700',
    success: 'bg-green-100 text-green-700',
}

const Chip: React.FC<ChipProps> = ({
    children,
    onClick,
    variant = 'default'
}) => {

    return (
        <span
            onClick={onClick}
            className={cn(`flex-shrink-0
                            flex items-center gap-1
                            whitespace-nowrap
                            px-3 py-0.5
                            rounded-full
                            text-sm 
                            shadow-sm
                            `,
                onClick ? 'cursor-pointer active:scale-95 transition' : '',
                variants[variant])}
        >
            {children}
        </span>
    )
}

export default Chip