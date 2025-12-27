import { API } from "@rkh-ms/classify-lib/api"
import { Lesson } from "@rkh-ms/classify-lib/interfaces"

import { CourseQuery } from "@/app/_types/queriesTypes"
import getServerAxios from "@/app/_utils/getServerAxios"
import CourseCard from "@/app/_components/courses/CourseCard"
import Last6Lessons from "@/app/_components/courses/course_details/Last6Lessons"
import CourseHeader from "@/app/_components/courses/course_details/CourseHeader"
import CourseGroupButton from "@/app/_components/courses/course_details/CourseGroupButtons"
import CourseInfo from "@/app/_components/courses/course_details/CourseInfo"

interface CourseDetailsProps {
    course: CourseQuery
}

const CourseDetails: React.FC<CourseDetailsProps> = async ({ course }) => {

    const axios = await getServerAxios()

    const { data: last6LessonsData } = await axios(API.lessons.getLast6Lessons(course.id))
    const last6Lessons = last6LessonsData as Lesson[]

    return (
        <div className="flex flex-col gap-4 
        lg:sticky lg:top-8">

            <div className="lg:hidden">
                <CourseHeader course={course} />
            </div>

            <CourseInfo courseId={course.id}>
                <CourseCard course={course} inCourse />
                <Last6Lessons lessons={last6Lessons} />
            </CourseInfo>

            {/**Show group of action buttons, to assign teachers, 
             * enroll students, report attendance & view lessons */}
            <CourseGroupButton courseId={course.id} />

        </div>
    )
}

export default CourseDetails