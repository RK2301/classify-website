import { useTranslations } from "next-intl"
import { useState } from "react"
import { MdDelete, MdOutlineCancel, MdRestore, MdUpdate } from "react-icons/md"

import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"
import { Lesson } from "@rkh-ms/classify-lib/interfaces"

import Restricted from "@/app/_components/access_control/Restricted"
import WrappedDropdown, { WrappedDropdownMenuItem } from "@/app/_components/WrappedDropdown"
import DeleteLesson from "@/app/_components/courses/course_details/lessons/DeleteLesson"
import CancelLesson from "@/app/_components/courses/course_details/lessons//CancelLesson"
import { LessonStatus } from "@rkh-ms/classify-lib/enums"
import UpdateLesson from "./UpdateLesson"


interface LessonDropMenuProps {
    lesson: Lesson
}

/**This component shows a drop menu for every lesson
 * 
 * menu will include 3 options
 * 
 * update lesson time
 * 
 * cancel lesson
 * 
 * delete lesson
 * 
 * the drop menu can be accessed only be manager
 */
const LessonDropMenu: React.FC<LessonDropMenuProps> = ({ lesson }) => {

    const t = useTranslations()

    /**control the update lesson dialog */
    const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false)

    /**control the delete lesson dialog */
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    /**control the cancel lesson dialog */
    const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false)

    console.log(updateDialogOpen);


    return (
        <Restricted action={Actions.readAny} resource={Resources.Lesson}>
            <WrappedDropdown>

                {/**update option */}
                <WrappedDropdownMenuItem
                    onClick={() => setUpdateDialogOpen(true)}
                    label={t('update')}
                    Icon={MdUpdate}
                />

                {/**cancel option */}
                <WrappedDropdownMenuItem
                    onClick={() => setCancelDialogOpen(true)}
                    label={lesson.status === LessonStatus.CANCELLED ? t('reactivateLesson') : t('cancel')}
                    Icon={lesson.status === LessonStatus.CANCELLED ? MdRestore : MdOutlineCancel}
                />

                {/**delete option */}
                <WrappedDropdownMenuItem
                    onClick={() => setDeleteDialogOpen(true)}
                    label={t('delete')}
                    Icon={MdDelete}
                    danger
                />

            </WrappedDropdown>


            <UpdateLesson
                open={updateDialogOpen}
                onOpenChange={setUpdateDialogOpen}
                lesson={lesson}
            />

            <CancelLesson
                open={cancelDialogOpen}
                setIsOpen={setCancelDialogOpen}
                courseId={lesson.course_id}
                lessonId={lesson.id}
                cancel={lesson.status !== LessonStatus.CANCELLED}
            />

            <DeleteLesson
                open={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
                courseId={lesson.course_id}
                lessonId={lesson.id}
            />
        </Restricted>
    )

}

export default LessonDropMenu