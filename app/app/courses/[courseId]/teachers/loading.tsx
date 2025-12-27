import { Skeleton } from "@/components/ui/skeleton"


const TeachersLoading = () => {

    return(
        <div className="flex flex-col gap-5 lg:px-9 pt-5">
             <div className="flex flex-col gap-2">
                {Array.from({ length: 5}).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-full rounded-md" />
                ))}
             </div>
        </div>
    )
}

export default TeachersLoading