import { Separator } from "@/components/ui/separator"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import SubjectDropMenu from "./SubjectDropMenu"
import { getLocale } from "next-intl/server"
import { Language } from "@/app/_types/Language"

interface SubjectItemProps {
    subject: Subject
}

/**This component represent a subject item from the subjects list */
const SubjectItem: React.FC<SubjectItemProps> = async ({ subject }) => {

    const locale = await getLocale() as Language
    const allLanguages: Language[] = ['ar', 'en', 'he']

    // array of 2 keys that left to show the second name for the subject under the main one
    const secondNames = (allLanguages.filter(key => key !== locale))
        .map(key => subject[key]) as [string, string]


    return (
        <div className="flex items-center justify-between gap-3">

            <div className="flex flex-col gap-1 basis-11/12">
                <div className="font-semibold">{subject[locale]}</div>

                <div className="flex items-center gap-1
                                 text-sm text-[var(--color-grey-500)]
                                 h-5">

                    <span>{secondNames[0]}</span>
                    <Separator orientation="vertical" />
                    <span>{secondNames[1]}</span>

                </div>
            </div>

            <SubjectDropMenu subjectId={subject.id} />

        </div>
    )
}

export default SubjectItem