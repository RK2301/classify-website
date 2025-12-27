import BackButton from "@/app/_components/BackButton"
import PillShapeTitle from "@/app/_components/PillShapeTitle"
import UpdateStudnetForm from "@/app/_components/UpdateStudentForm"
import getServerAxios from "@/app/_utils/getServerAxios"
import { StudentQuery } from "@rkh-ms/classify-lib"
import { getTranslations } from "next-intl/server"

type UpdateStudentPageProps = {
    params: Promise<Record<string, string>>
}

const UpdateStudentPage = async ({ params }: UpdateStudentPageProps) => {

    const axios = await getServerAxios()
    const t = await getTranslations()

    //read student id from the params
    const p = await params
    const studentId = p.studentId

    //fetch student data
    const res = await axios(`/api/users/students/${studentId}`, {
        method: 'GET'
    })

    const student = res.data as StudentQuery

    //render the update form
    return (
        <>
            <div className="flex justify-between items-center mb-4 w-full">
                <BackButton />

                <PillShapeTitle
                    title={t('edit_student_details')}
                />

                <div />
            </div>

            <UpdateStudnetForm student={student} />
        </>
    )
}

export default UpdateStudentPage