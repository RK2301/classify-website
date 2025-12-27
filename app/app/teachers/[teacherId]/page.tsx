import BackButton from "@/app/_components/BackButton"
import PillShapeTitle from "@/app/_components/PillShapeTitle"
import UpdateTeacherForm from "@/app/_components/teachers/UpdateTeacherForm"
import getServerAxios from "@/app/_utils/getServerAxios"
import { TeacherQuery } from "@rkh-ms/classify-lib"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import { getTranslations } from "next-intl/server"

interface UpdateTeacherPageProps {
    params: Promise<Record<string, string>>
}

const UpdateTeacherPage: React.FC<UpdateTeacherPageProps> = async ({
    params
}) => {

    const t = await getTranslations()
    const teacherId = (await params).teacherId

    // fecth the teacher data
    const axios = await getServerAxios()
    const { data } = await axios(`/api/users/teachers/${teacherId}`)
    const teacher = data as TeacherQuery

    // fertch subjects
    const subjects = (await axios('/api/subjects')).data as Subject[]

    return (
        <>
            <div className="flex items-center justify-between gap-2 mb-4 w-full">
                <BackButton />

                <PillShapeTitle
                    title={t('updateTeacher')}
                />

                <div />
            </div>

            <UpdateTeacherForm teacher={teacher} subjects={subjects} />
        </>
    )
}

export default UpdateTeacherPage