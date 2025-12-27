import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { IconType } from "react-icons/lib"

interface WrappedEmptyProps {
    /**icon to display in the empty message */
    Icon: IconType,
    /**title of the empty message */
    title: string,
    /**description of the empty message */
    description: string,
    /**class name for the empty */
    className?: string
}


/**This component warp Empty component from Shadcn, so can be used to show empty message
 * 
 * for instance: when no materials exists, courses, subject, teachers .....
 */
const WrappedEmpty: React.FC<WrappedEmptyProps> = ({ Icon, title, description, className }) => {

    return (
        <Empty className={className}>
            <EmptyHeader>
                <EmptyMedia
                    className="bg-[var(--color-grey-0)]"
                    variant={'icon'}>
                    <Icon />
                </EmptyMedia>

                <EmptyTitle>
                    {title}
                </EmptyTitle>

                <EmptyDescription>
                    {description}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}

export default WrappedEmpty