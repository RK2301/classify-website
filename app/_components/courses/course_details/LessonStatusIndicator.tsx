
import { LessonStatus } from "@rkh-ms/classify-lib/enums"
import { useTranslations } from "next-intl"

interface LessonStatusIndicatorProps {
    /**status of the lesson
     * 
     * each lesson status has it's own background color
     */
    status: LessonStatus,

    /**if true then return dot indicating lesson status and next to it add label describe the status
     * 
     * e.g. green dot and next to it "Ongoing" if lesson status is ongoing
     */
    label?: boolean
}



/**This component shows a rounded dot indicate lessons status
 * 
 * Scheduled, ongoing, completed or cancelled
 * 
 * each status have different background color
 */
const LessonStatusIndicator: React.FC<LessonStatusIndicatorProps> = ({ status,
    label = false }) => {

    const t = useTranslations()

    const statusColor = {
        /**lesson not yet started will have a yellow background */
        [LessonStatus.SCHEDULED]: {
            color: 'bg-yellow-400/60',
            label: t('scheduled')
        },

        /**Lesson that currently ongoing will have green background color */
        [LessonStatus.ONGOING]: {
            color: 'bg-green-400/60',
            label: t('courseOngoing')
        },

        /**Lesson that completed will have a light blue background color */
        [LessonStatus.COMPLETED]: {
            color: 'bg-blue-400/60',
            label: t('courseCompleted')
        },

        [LessonStatus.CANCELLED]: {
            color: 'bg-red-400/60',
            label: t('cancelled')
        }
    }

    //ring-1 ring-white/10
    const StatusDot = <div className={`h-1.5 w-1.5 rounded-full 
         ${statusColor[status].color}`} />


    if (label)
        return (
            <div
                className="flex items-center gap-1"
            >
                {StatusDot}
                <span className="text-foreground/80">{statusColor[status].label}</span>
            </div>
        )

    return StatusDot
}

export default LessonStatusIndicator