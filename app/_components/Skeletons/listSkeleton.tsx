import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type ListSkeletonProps = {
    /**number of skeletons to show
     * @default 4
     */
    numberOfItems?: number
    className?: string
}

/**This componenet render a number of Skeletons to indicate a list begin loading
 ** good to use when fetch a  data to show in a list.
 */
const ListSkeleton: React.FC<ListSkeletonProps> = ({
    numberOfItems = 4,
    className = ''
}) => {

    return (
        <div className={cn('flex flex-col gap-3', className)}>
            {Array.from({ length: numberOfItems }).map((_, index) => (
                <Skeleton key={index} className="h-7 w-full" />
            ))}
        </div>
    )
}

export default ListSkeleton