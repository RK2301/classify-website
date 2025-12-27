import ListSkeleton from "@/app/_components/Skeletons/listSkeleton"
import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {

    return (
        <div
            className="flex lg:gap-9 h-full w-11/12 md:w-3/4"
        >
            <div className="h-full lg:basis-2/5 mt-16">
                <ListSkeleton numberOfItems={8} />
            </div>

            <div className="hidden 
            lg:grow lg:h-full lg:flex lg:items-center lg:justify-center
            ">
                <div className="basis-9/12">
                    <Skeleton className="w-[300px] h-[200px]" />
                </div>
            </div>
        </div>
    )
}

export default Loading