import React from "react"
import { cn } from "@/lib/utils"


interface PillShapeTitleProps extends React.ComponentPropsWithoutRef<"div"> {
    title: string,
    /**if true, then the title can be clicked, so that will add hover and click effects */
    clickable?: boolean
}

const PillShapeTitle = React.forwardRef<HTMLDivElement, PillShapeTitleProps>(({
    title,
    className,
    clickable,
    ...props
}) => {

    return (
        <div
            className={cn(`bg-[var(--color-grey-0)]
                    border border-[var(--color-grey-200)]
                    text-xl
                    shadow-sm
                    rounded-full px-5 py-1.5
                    w-fit max-w-full
                    truncate
                    font-medium
                    transition-all duration-300
                    outline-none focus-visible:border-ring focus-visible:ring-brand-500 focus-visible:ring-[3px] 
                    `,
                clickable && "cursor-pointer hover:brightness-95 active:scale-95 ",
                className)}
            {...props}
        >
            {title}
        </div>
    )
})


PillShapeTitle.displayName = "PillShapeTitle"

export default PillShapeTitle