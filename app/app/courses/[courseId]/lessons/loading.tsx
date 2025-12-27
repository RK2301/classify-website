import { Skeleton } from "@/components/ui/skeleton"



const LessonsLoading = () => {

    return(
        <div className="xl:px-9 w-full
        flex flex-col items-center gap-6">
            <Skeleton className="w-full lg:w-3/4 h-96 rounded-lg"/>

            <div className="flex flex-col gap-2.5 w-full">
                {Array.from({length: 3}).map((_, index) => (
                    <Skeleton key={index} className="w-full h-6 rounded-lg"/>
            ))}
            </div>
            
        </div>
    )
}

export default LessonsLoading