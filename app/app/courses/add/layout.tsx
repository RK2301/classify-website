import BackButton from "@/app/_components/BackButton"
import PillShapeTitle from "@/app/_components/PillShapeTitle"
import { getTranslations } from "next-intl/server"


const AddCourseLayout = async({ children }: { children: React.ReactNode }) => {

    const t = await getTranslations()
    
    return(
        <>
            <div className="flex justify-between items-center mb-7 w-full">
                <BackButton />

                <PillShapeTitle title={t('addCourse')} />

                <div />
            </div>

            {children}
        </>
    )
}

export default AddCourseLayout