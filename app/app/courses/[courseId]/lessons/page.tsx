import LessonsCalendar from "@/app/_components/courses/course_details/lessons/LessonsCalendar"
import getServerAxios from "@/app/_utils/getServerAxios"
import { API } from "@rkh-ms/classify-lib/api"
import { Lesson } from "@rkh-ms/classify-lib/interfaces"


export const metadata = {
    title: 'Lessons'
}

type LessonsPageProps = {
    params: Promise<Record<string, string>>,
}



const LessonsPage: React.FC<LessonsPageProps> = async ({ params }) => {

    const p = await params
    const courseId = Number(p.courseId)

    const axios = await getServerAxios()
    const { data } = await axios(API.lessons.getLessons(courseId))

    const lessons = data as Lesson[]


    return <LessonsCalendar lessons={lessons} courseId={courseId} />
}

export default LessonsPage