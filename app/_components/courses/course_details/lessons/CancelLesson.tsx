'use client'

import { useTranslations } from "next-intl"

import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { cancelLessonAction } from "@/app/_actions/cancelLessonAction"


interface lessonId {
    courseId: number,
    lessonId: number,

    /**true indicate make request to cancel the lesson
     * 
     * false make request to un-cancel the lesson (if already cancelled)
     */
    cancel: boolean,
    open: boolean,
    setIsOpen: (open: boolean) => void
}

/**This component show a alert dialog to ask user if want to un|cancel a lesson */
const CancelLesson: React.FC<lessonId> = ({
    courseId,
    lessonId,
    open,
    setIsOpen,
    cancel
}) => {

    const t = useTranslations()

    const { doRequest } = useRequest({
        toThrowError: true
    })

    // this function handle when user accept the message to cancel the lesson
    // by calling the cancel action server
    const handleAccept = () =>
        new Promise<void>(async (resolve, reject) => {
            try {
                await doRequest(() => cancelLessonAction(courseId, lessonId, cancel))
                resolve()
            } catch {
                reject()
            }
        })

    return (
        <WrappedAlertDialog
            isOpen={open}
            setIsOpen={setIsOpen}
            message={cancel ? t('cancelLessonAlert') : t('reactivateLessonAlert')}
            successMsg={cancel ? t('cancelLessonSuccess') : t('reactivateLessonSuccess')}
            onAccept={handleAccept}
            danger={cancel}
        />
    )
}

export default CancelLesson