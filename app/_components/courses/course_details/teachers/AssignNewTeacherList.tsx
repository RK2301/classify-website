'use client'

import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { MdOutlineSearchOff } from "react-icons/md"

import { TeacherQuery } from "@rkh-ms/classify-lib"

import SearchInput from "@/app/_components/SearchInput"
import Avatar from "@/app/_components/Avatar"
import List from "@/app/_components/List"
import useRequest from "@/app/_hooks/use-request"
import { assignTeacherAction } from "@/app/_actions/assignTeacherAction"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import WrappedEmpty from "@/app/_components/WrappedEmpty"




interface AssignNewTeacherListProps {
    teachers: Exclude<TeacherQuery, 'Subjects'>[],
    courseId: number
}


/**This component dispaly a list of teachers that can be assigned, 
 * 
 * and at the top of them will display search input
 */
const AssignNewTeacherList: React.FC<AssignNewTeacherListProps> = ({ teachers, courseId }) => {

    const t = useTranslations()
    const router = useRouter()

    const [selected, setSelected] = useState<string>('')
    const [isPending, startTransition] = useTransition()

    /**function to be called when user select teacher to assign
     * 
     * when teacher already assigned and user click on it again, it will be de-selected
     */
    const handleSelected = (id: string) => {
        setSelected(prevId => prevId === id ? '' : id)
    }

    const { doRequest } = useRequest({
        onSuccess: () => {

            const teacherSelected = teachers.find(teacher => teacher.id === selected)
            const teacherName = teacherSelected!.User.firstName + ' ' + teacherSelected?.User.lastName

            toast.success(t('assignTeacherSuccess', {
                name: teacherName
            }))

            /**navigate back to course teachers page */
            router.push(`/app/courses/${courseId}/teachers`)
        }
    })

    /**These function will be called when user already selected teacher to assign,
     * 
     *  and want to assign it to the course */
    const onAssign = () => {
        if (!selected)
            return

        startTransition(() => doRequest(() => assignTeacherAction(courseId, selected)))
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
                        onClick={onAssign}
                    >
                        {t('assign')}
                    </SubmitButton>
                </div>
            </div>

            {/**list of teachers that can be assigned */}
            {teachers.length > 0 &&
                <List>
                    {teachers.map(teacher => (
                        <List.ListItem
                            key={teacher.id}
                            className="cursor-pointer px-3 py-1.5"
                            onClick={() => handleSelected(teacher.id)}
                            selected={selected === teacher.id}
                        >

                            <div className="flex items-center gap-2">
                                <Avatar firstName={teacher.User.firstName} lastName={teacher.User.lastName} />
                                <span>{teacher.User.firstName + ' ' + teacher.User.lastName}</span>
                            </div>

                        </List.ListItem>
                    ))}
                </List>
            }


            {/**if no teachers found to assign, then show empty message */}
            {teachers.length === 0 &&
                <WrappedEmpty
                    Icon={MdOutlineSearchOff}
                    title={t('emptyAssignTitle')}
                    description={t('emptyAssignDescription')}
                />
            }
        </>
    )

}

export default AssignNewTeacherList