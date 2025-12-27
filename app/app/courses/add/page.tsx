import AddCourseForm from "@/app/_components/courses/AddCourseForm"
import getServerAxios from "@/app/_utils/getServerAxios"
import { TeacherQuery } from "@rkh-ms/classify-lib"
import { Subject } from "@rkh-ms/classify-lib/interfaces"


export const metadata = {
    title: 'Add Course'
}

const AddCoursePage = async () => {


    // fetch all subjects and teachers
    const axios = await getServerAxios()

    const [subjectsData, teachersData] = await Promise.all([axios('/api/subjects'), axios('/api/users/teachers/allTeachers')])

    const subjects = subjectsData.data as Subject[];
    const teachers = teachersData.data as Exclude<TeacherQuery, 'Subjects'>[]

    return <AddCourseForm subjects={subjects} teachers={teachers} />
    
}

export default AddCoursePage