import { Separator } from "@/components/ui/separator"
import { ShiftQuery } from "@rkh-ms/classify-lib"
import ShiftDetails from "./ShiftDetails"


interface DayShifts {
    day: {
        day: number,
        weekDay: string
    },
    dayShifts: ShiftQuery[] | undefined
}

/**This component displays a shifts start at the specific day */
const DayShifts: React.FC<DayShifts> = ({
    day,
    dayShifts
}) => {

    return (
        <>
            <div className="flex flex-col gap-2 items-center w-[12%] md:basis-1/12">
                <span className='text-[var(--color-grey-400)]'>{day.weekDay}</span>
                <span className="font-semibold text-2xl">{day.day}</span>
            </div>

            <Separator orientation='vertical' />

            <div className="flex flex-col gap-2.5 grow">
                {
                    dayShifts?.map(dayShift => <ShiftDetails key={dayShift.id} shift={dayShift} />)
                }
            </div>
        </>
    )
}

export default DayShifts