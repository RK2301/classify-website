import { Button as ShadcnUIButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"


interface ButtonProps {
    /**class names to be applied to the button */
    className?: string,
    /**asChild prop for the button */
    asChild?: boolean,
    children: React.ReactNode,
    onClick?: () => void
}

/**A button that can be displayed inside a ButtonGroup component */
const Button = ({
    className = '',
    asChild,
    children,
    onClick
}: ButtonProps) => {

    return (
        <ShadcnUIButton
            variant={'outline'}
            className={cn(`flex flex-col gap-1
                        h-auto font-normal
                        transition-all duration-300
                        [&:not(:last-child)]:border-e-0
                        [&:not(:first-child)]:border-s-0
                        [&:not(:last-child)]:rounded-e-none
                        [&:not(:first-child)]:rounded-s-none
                        [&_svg]:size-5
                        text-[12px] text-[var(--color-grey-700)]
                        `, className)}
            asChild={asChild}
            onClick={onClick}
        >
            {children}
        </ShadcnUIButton>
    )
}



interface ButtonGroupProps {
    /**class names to be applied to the button group */
    className?: string,
    children: React.ReactNode
}

/**This component shows a group of buttons */
const ButtonGroup = ({ className = '', children }: ButtonGroupProps) => {

    return (
        <div className={cn(`grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] 
                rounded-lg bg-[var(--color-grey-50)]`, className)}>
            {children}
        </div>
    )
}

ButtonGroup.Button = Button
export default ButtonGroup