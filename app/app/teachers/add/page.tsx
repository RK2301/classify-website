import BackButton from "@/app/_components/BackButton"
import PillShapeTitle from "@/app/_components/PillShapeTitle"
import AddTeacherForm from "@/app/_components/teachers/AddTeacherForm"
import getServerAxios from "@/app/_utils/getServerAxios"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import { getTranslations } from "next-intl/server"


const AddTeacherPage = async () => {

    const t = await getTranslations()

    // fetch all subjects
    const axios = await getServerAxios()
    const { data } = await axios('/api/subjects')
    const subjects = data as Subject[]

    return (
        <>
            {/**Back page and title */}
            <div className="flex items-center justify-between mb-4 w-full">
                <BackButton />

                <PillShapeTitle
                    title={t('addTeacher')}
                />

                <div />
            </div>

            {/**Add teacher form */}
            <AddTeacherForm subjects={subjects} />
        </>
    )
}

export default AddTeacherPage