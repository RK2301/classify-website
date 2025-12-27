'use client'

import { useTranslations } from "next-intl"

import { deleteLessonAction } from "@/app/_actions/deleteLessonAction"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"


interface lessonId {
    courseId: number,
    lessonId: number,
    open: boolean,
    setIsOpen: (open: boolean) => void
}

/**This component show a alert dialog to ask user if want to delete a lesson */
const DeleteLesson: React.FC<lessonId> = ({
    courseId,
    lessonId,
    open,
    setIsOpen
}) => {

    const t = useTranslations()

    const { doRequest } = useRequest({
        toThrowError: true
    })

    // this function handle when user accept the message to delete the lesson
    // by calling the delete action server
    const handleAccept = () =>
        new Promise<void>(async (resolve, reject) => {
            try {
                await doRequest(() => deleteLessonAction(courseId, lessonId))
                resolve()
            } catch {
                reject()
            }
        })

    return (
        <WrappedAlertDialog
            isOpen={open}
            setIsOpen={setIsOpen}
            message={t('deleteLessonAlert')}
            successMsg={t('deleteLessonSuccess')}
            onAccept={handleAccept}
            danger
        />
    )
}

export default DeleteLesson