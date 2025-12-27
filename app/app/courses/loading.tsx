import { Skeleton } from "@/components/ui/skeleton"



const CoursesLoading = () => {

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2
         gap-5 lg:gap-4 w-full
         mt-16">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-40" />
            ))}
        </div>
    )
}

export default CoursesLoading