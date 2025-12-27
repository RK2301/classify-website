import { LessonStatus } from "@rkh-ms/classify-lib/enums"
import LessonStatusIndicator from "./LessonStatusIndicator"


/**
 * Shows a legend explaining each lesson status:
 * colored dot + label for every status type.
 */
const LessonStatusLegend = () => {

    return (
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-foreground/80">
            <LessonStatusIndicator status={LessonStatus.SCHEDULED} label />

            <LessonStatusIndicator status={LessonStatus.ONGOING} label />

            <LessonStatusIndicator status={LessonStatus.COMPLETED} label />

            <LessonStatusIndicator status={LessonStatus.CANCELLED} label />
        </div >
    )
}

export default LessonStatusLegend