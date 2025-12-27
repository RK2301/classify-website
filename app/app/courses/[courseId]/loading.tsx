import { Skeleton } from "@/components/ui/skeleton"


const CourseMaterialsLoading = () => {

    return(
        <div className="flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-34" />
            ))}
        </div>
    )
}

export default CourseMaterialsLoading