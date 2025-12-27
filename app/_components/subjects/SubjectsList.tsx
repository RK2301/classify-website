import { Subject } from "@rkh-ms/classify-lib/interfaces"
import List from "../List"
import SubjectItem from "./SubejctItem"
import SubjectsListHeader from "./SubjectsListHeader"
import { getTranslations } from "next-intl/server"


interface SubjectsListProps {
    subjects: Subject[],

    /**indicate current subject selected to be edit */
    selectedSubject: number | undefined
}

/**This component will render a subjects data as a list */
const SubjectsList: React.FC<SubjectsListProps> = async ({
    subjects,
    selectedSubject
}) => {

    const t = await getTranslations()

    return (
        <div className="flex flex-col gap-4 relative
         px-1 h-full">

            <SubjectsListHeader />

            {
                subjects.length > 0 &&
                <List>
                    {subjects.map(subject => (
                        <List.ListItem key={subject.id} selected={selectedSubject === subject.id}>
                            <SubjectItem subject={subject} />
                        </List.ListItem>
                    ))}
                </List>
            }

            {subjects.length === 0 && (
                <div className="grow flex items-center justify-center">
                    <span className="font-semibold text-xl">{t('noSubjectsFound')}</span>
                </div>
            )}

        </div>
    )
}

export default SubjectsList