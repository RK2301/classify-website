import CourseDetails from "@/app/_components/courses/course_details/CourseDetails"
import CourseHeader from "@/app/_components/courses/course_details/CourseHeader"
import { CourseQuery } from "@/app/_types/queriesTypes"
import getServerAxios from "@/app/_utils/getServerAxios"
import { API } from "@rkh-ms/classify-lib/api"
import { ReactNode } from "react"

type CourseDetailsLayoutProps = {
    params: Promise<Record<string, string>>,
    children: ReactNode
}


const CourseDetailsLayout: React.FC<CourseDetailsLayoutProps> = async ({ children, params }) => {

    const p = await params
    const courseId = Number(p.courseId)

    const axios = await getServerAxios()
    const { data } = await axios(API.courses.getCourse(courseId))

    const course = data as CourseQuery

    return (
        <div className="w-full flex flex-col-reverse
         lg:flex-row gap-6 lg:gap-0
         pb-16 md:pb-0">

            <div className="lg:w-3/5">

                <div className="lg:flex lg:justify-center lg:px-3 hidden">
                    <CourseHeader course={course} />
                </div>

                <div className="lg:px-9 mt-5">
                    {children}
                </div>
            </div>

            <div className="lg:w-2/5">
                <CourseDetails course={course} />
            </div>
        </div>
    )
}

export default CourseDetailsLayout