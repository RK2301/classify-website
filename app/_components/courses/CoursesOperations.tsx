import FilterCourses from "./FilterCoursesDialog";
import SortByCourses from "./SortByCourses"

/**This component to show a course operation
 * which are sorting and filtering
 */
const CoursesOperations = () => {

    return (
        <div className="flex justify-between items-center gap-3">
            <div className="w-2/3 lg:w-1/4">
                <SortByCourses />
            </div>

            <div className="w-1/3 lg:max-w-1/5">
                <FilterCourses />
            </div>
        </div>
    )
}

export default CoursesOperations;