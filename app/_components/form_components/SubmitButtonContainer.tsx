import SubmitButton from "@/app/_components/form_components/SubmitButton"
import { cn } from "@/lib/utils"

interface SubmitButtonContainerProps {
    children: React.ReactElement<typeof SubmitButton>,

    /**pass or overwrite exists styles
     * 
     * e.g. like make button more bigger for some senarios
     */
    className?: string
}

/**
 * A layout container used to center and size the `SubmitButton` component responsively.
 *
 * This container ensures consistent spacing and alignment for submit buttons
 * across forms. 
 * 
 ** for small screen the button will occupy all the width, of the total form width
 * 
 ** for large screen submit button will occupy 25% width of the total form width
 *
 * @component
 * @example
 * // Example usage inside a form:
 * <form onSubmit={handleSubmit(onSubmit)}>
 *   ...
 *   <SubmitButtonContainer>
 *     <SubmitButton isSubmitting={isSubmitting}>
 *       Save
 *     </SubmitButton>
 *   </SubmitButtonContainer>
 * </form>
 * 
 */

const SubmitButtonContainer: React.FC<SubmitButtonContainerProps> = ({
    children,
    className
}) => {

    return (
        <div className="flex items-center justify-center w-full mt-6">
            <div className={cn("basis-full md:basis-1/4", className)}>
                {children}
            </div>
        </div>
    )
}

export default SubmitButtonContainer