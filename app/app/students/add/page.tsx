import AddStudentForm from "@/app/_components/AddStudentForm"
import BackButton from "@/app/_components/BackButton"
import PillShapeTitle from "@/app/_components/PillShapeTitle"
import { getTranslations } from "next-intl/server"


const AddStudentPage = async () => {

    const t = await getTranslations()

    return (
        <>
            {/**Back page and title */}
            <div className="flex justify-between items-center mb-4 w-full">
                <BackButton />

                <PillShapeTitle
                    title={t('addStudent')}
                />

                <div />
            </div>

            {/**Add student form */}
            <AddStudentForm />
        </>
    )
}

export default AddStudentPage