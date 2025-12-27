import { Skeleton } from "@/components/ui/skeleton"


const AttendanceLoading = () => {

    return(
        <div className="flex flex-col gap-7">

            <div className="flex justify-center items-center gap-2 px-1
                overflow-x-hidden">
                    {Array.from({length: 4}).map((_, index) => (
                        <Skeleton key={index} className="w-32 h-24 rounded-lg"/>
                    ))}
            </div>

            <div className="flex flex-col gap-2 w-full 2xl:px-7">
                {Array.from({length: 5}).map((_, index) => (
                    <Skeleton key={index} className="w-full h-8 rounded-lg"/>
                ))}
            </div>
        </div>
    )
}

export default AttendanceLoading