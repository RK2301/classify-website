import { SearchParamsType } from "@/app/_types/searchParams"
import getServerAxios from "@/app/_utils/getServerAxios"
import { SearchParams } from "@/app/_utils/SearchParams"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import SubjectFormContainer from "./SubjectFormContainer"

interface SubjectFormSideProps {
    searchParams: Awaited<SearchParamsType>
}


/**This server component is to fetch subject data if the URL have a search param */
const SubjectFormSide: React.FC<SubjectFormSideProps> = async ({ searchParams }) => {

    // 1. read the value of seacrh param called "u"
    const subjectId = searchParams[SearchParams.SubjectId]

    let subjectToUpdate: Subject | undefined

    // 2. if there are a subject id then fetch it's data
    if (subjectId) {
        const axios = await getServerAxios()

        const { data } = await axios(`/api/subjects/${subjectId}`)
        subjectToUpdate = data as Subject
    }

    return <SubjectFormContainer subject={subjectToUpdate} />

}

export default SubjectFormSide