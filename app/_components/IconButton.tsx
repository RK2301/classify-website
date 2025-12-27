import { cn } from "@/lib/utils";
import React from "react";
import {HTMLMotionProps, motion} from 'framer-motion'

type IconButtonProps = {

    /**variant of the button
     * 
     * default: will show the icon button in border and dark grey background
     * 
     * destructive: variant will show the icon without a border or background, and red background when hover or clicked
     */
    variant?: keyof typeof variants,
} & HTMLMotionProps<'button'>


const variants = {
    /**default variant will show the icon button in border and dark grey background */
    default: `border border-[var(--color-grey-200)]
    bg-[var(--color-grey-0)] shadow-sm`,

    /**destructive variant will show the icon without a border or background, 
     * 
     * and red background when hover or clicked 
     * 
     * can be used for instance for delete button
     */
    destructive: `bg-transparent border-transparent
    hover:bg-red-600 active:bg-red-600/70`,

    /**Ghost variant, the button will get transparent color & border will be hidden
     * when hover over the button, it will get light grey background color
     */
    ghost: 'bg-transparent border-none'
}


const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ children,
    className = '',
    variant = 'default',
    ...props 
    }, ref) => {

    return (
        <motion.button
            ref={ref}
            whileTap={{
                scale: 1.1
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 10
            }}

            className={cn(`inline-flex items-center justify-center
                            rounded-full p-2
                            border 
                            transition-colors duration-200
                            hover:brightness-95
                            outline-none focus-visible:border-ring focus-visible:ring-brand-500 focus-visible:ring-[3px]          
                            disabled:opacity-50 disabled:cursor-not-allowed 
                        `, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    )
})

IconButton.displayName = 'IconButton'
export default IconButton;

//                            transform transition-all duration-300  
