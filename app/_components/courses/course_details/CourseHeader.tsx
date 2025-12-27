import BackButton from "@/app/_components/BackButton"
import { CourseQuery } from "@/app/_types/queriesTypes"
import CourseStatusChip from "@/app/_components/courses/CourseStatusChip"
import TitleDialog from "./TitleDialog"


interface CourseHeaderProps {
    course: CourseQuery
}


/**This component display a header for a course page which is:
 * 
 * Back button | Title | Status chip
 */
const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {

    return (
        <div className="flex items-center justify-between gap-2
        w-full lg:max-w-[75%]">
            <BackButton />

            {/**Title of the course */}
            <TitleDialog courseId={course.id} title={course.title} />

            <div>
                <CourseStatusChip startDate={course.startDate} endDate={course.endDate} />
            </div>
        </div>
    )
}

export default CourseHeader