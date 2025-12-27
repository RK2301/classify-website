import { CourseQuery } from "@/app/_types/queriesTypes"
import CourseCard from "@/app/_components/courses/CourseCard"
import AnimatedCoursesContainer from "./AnimatedCoursesContainer"

interface CoursesContainerProps {
    courses: CourseQuery[],
    /**  optional key to force re-rendering when needed (play animation again)*/
    cacheKey?: string 
}

/**This component create a container that shows each course data inside a card
 * for large screen, 2 cards will be shown in a row,
 *  while for small screen, only 1 card will be shown in a row
 */
const CoursesContainer: React.FC<CoursesContainerProps> = ({
    courses, 
    cacheKey
}) => {

    return (
        <div key={cacheKey}>
            <AnimatedCoursesContainer>
                {courses.map(course => <CourseCard key={course.id} course={course} />)}
            </AnimatedCoursesContainer>
        </div>
    )
}

export default CoursesContainer