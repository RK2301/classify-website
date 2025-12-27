import { Skeleton } from "@/components/ui/skeleton"


const loading = () => {

    return (
        <div
            className="flex items-center
            h-full w-11/12 md:w-3/4"
        >
            <div className="flex flex-col gap-4">
                <Skeleton className="h-[20px] w-1/2 rounded-md " />
                <Skeleton className="h-[20px] w-3/4 rounded-md " />
                <Skeleton className="h-[100px] w-full rounded-md " />
            </div>
        </div>
    )
}

export default loading