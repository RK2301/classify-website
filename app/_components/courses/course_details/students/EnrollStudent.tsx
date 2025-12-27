'use client'

import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { MdOutlineSearchOff } from "react-icons/md"

import { StudentQuery } from "@rkh-ms/classify-lib"

import SearchInput from "@/app/_components/SearchInput"
import Avatar from "@/app/_components/Avatar"
import List from "@/app/_components/List"
import useRequest from "@/app/_hooks/use-request"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import WrappedEmpty from "@/app/_components/WrappedEmpty"
import { enrolStudentAction } from "@/app/_actions/enrollStudentAction"




interface EnrollStudentsProps {
    students: StudentQuery[],
    courseId: number
}


/**This component dispaly a list of students that can be enrolled, 
 * 
 * and at the top of them will display search input
 */
const EnrollStudents: React.FC<EnrollStudentsProps> = ({ students, courseId }) => {

    const t = useTranslations()
    const router = useRouter()

    const [selected, setSelected] = useState<string>('')
    const [isPending, startTransition] = useTransition()

    /**function to be called when user select student to enroll
     * 
     * when student already selected and user click on it again, it will be de-selected
     */
    const handleSelected = (id: string) => {
        setSelected(prevId => prevId === id ? '' : id)
    }

    const { doRequest } = useRequest({
        onSuccess: () => {

            const studentSelected = students.find(student => student.id === selected)
            const studentName = studentSelected!.User.firstName + ' ' + studentSelected?.User.lastName

            toast.success(t('enrollSuccess', {
                name: studentName
            }))

            /**navigate back to course students page */
            router.push(`/app/courses/${courseId}/students`)
        }
    })

    /**These function will be called when user already selected student to enroll,
     * 
     *  and want to enroll it to the course */
    const onEnroll = () => {
        if (!selected)
            return

        startTransition(() => doRequest(() => enrolStudentAction(courseId, selected)))
    }

    return (
        <>
            {/**search bar + assign button */}
            <div className="flex justify-between items-center gap-2">
                <SearchInput />

                <div className="basis-1/5">
                    <SubmitButton
                        disabled={!selected || isPending}
                        isSubmitting={isPending}
                        onClick={onEnroll}
                    >
                        {t('enroll')}
                    </SubmitButton>
                </div>
            </div>

            {/**list of students that can be enrolled */}
            {students.length > 0 &&
                <List>
                    {students.map(student => (
                        <List.ListItem
                            key={student.id}
                            className="cursor-pointer px-3 py-1.5"
                            onClick={() => handleSelected(student.id)}
                            selected={selected === student.id}
                        >

                            <div className="flex items-center gap-2">
                                <Avatar firstName={student.User.firstName} lastName={student.User.lastName} />
                                <span>{student.User.firstName + ' ' + student.User.lastName}</span>
                            </div>

                        </List.ListItem>
                    ))}
                </List>
            }


            {/**if no students found to enroll, then show empty message */}
            {students.length === 0 &&
                <WrappedEmpty
                    Icon={MdOutlineSearchOff}
                    title={t('noStudentsFound')}
                    description={t('emptyEnrollStudentDescription')}
                />
            }
        </>
    )

}

export default EnrollStudents