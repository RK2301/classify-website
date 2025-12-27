import { LessonCalendar } from "@/app/_types/queriesTypes"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import dayjs from "dayjs"
import CourseTeachers from "../courses/CourseTeachers"
import LessonStatusIndicator from "../courses/course_details/LessonStatusIndicator"

interface LessonDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    lesson?: LessonCalendar
}

const LessonDialog: React.FC<LessonDialogProps> = ({ open, onOpenChange, lesson }) => {

    // if no lesson passed then don't return anything
    if (!lesson) return

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="md:w-1/4">
                <div className="flex flex-col gap-3 w-full">

                    {/**Course title */}
                    <div className="flex justify-between items-center gap-2">
                        <span className="font-medium text-xl">{lesson.Course.title}</span>

                        {/**Lesson status indicator */}
                        <div className="basis-auto">
                            <LessonStatusIndicator label status={lesson.status} />
                        </div>
                    </div>

                    {/**start & end time */}
                    <div
                        dir="ltr"
                        className="flex justify-center items-center gap-2 text-(--color-grey-600)">

                        {/**date and start time */}
                        <div className="flex items-center gap-1">
                            <span className="font-medium text-(--color-grey-900) text-lg">
                                {dayjs(lesson.startTime).format('DD/MM')}
                            </span>
                            <span>{dayjs(lesson.startTime).format('HH:mm')}</span>
                        </div>

                        {/**Separator */}
                        <span>{'-'}</span>

                        {/**end time */}
                        <span>{dayjs(lesson.endTime).format('HH:mm')}</span>
                    </div>

                    {/**Separator */}
                    <Separator />

                    {/**Teachers of the course */}
                    <CourseTeachers teachers={lesson.Course.Teachers} title={lesson.Course.title} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LessonDialog