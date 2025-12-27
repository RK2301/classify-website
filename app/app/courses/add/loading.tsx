import { Skeleton } from "@/components/ui/skeleton"


const AddCourseLoading = () => {

    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
            {Array.from({length: 5}).map((_, index) => (
                <Skeleton key={index} className="h-6 w-full rounded-lg" />
            ))}
        </div>
    )
}

export default AddCourseLoading