'use client'

import { cn } from "@/lib/utils"

export interface AvatarProps {
    firstName: string,
    lastName: string,
    size?: keyof typeof AvatarSize,
}


const getInitials = (first?: string, last?: string) => {
    const a = (first || "").trim().charAt(0) || ""
    const b = (last || "").trim().charAt(0) || ""
    return (a + b).toUpperCase()
}

/**object the map between avatar size and appropirate text size */
const AvatarSize = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-9 h-9 text-sm',
    md: 'w-12 h-12 text-3xl',
    lg: 'w-16 h-16 text-4xl',
    xl: 'h-32 w-32 text-6xl'
}


/**This component shows avatar for a user
 * 
 * the avatar created based on the first name and last name (takes first letter for each of them)
 * 
 * for example Rami Khattab -> will return avatar with letters: RK
 */
const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, size = 'sm' }) => {

    return (
        <div
            className={cn(`
                    rounded-full flex items-center justify-center
                    font-semibold text-white bg-brand-500 shadow-sm
                    `, AvatarSize[size])}
            title={`${firstName} ${lastName}`}
        >
            {getInitials(firstName, lastName)}
        </div>
    )
}

export default Avatar