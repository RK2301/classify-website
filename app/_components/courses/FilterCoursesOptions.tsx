import { useLocale, useTranslations } from "next-intl"

import { CourseStatus } from "@rkh-ms/classify-lib/enums";
import { TeacherQuery } from "@rkh-ms/classify-lib";
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol";
import { Subject } from "@rkh-ms/classify-lib/interfaces";

import WrappedSelect from "@/app/_components/WrappedSelect";
import AnimatedToggleGroup, { ToggleOption } from "@/app/_components/AnimatedToggleGroup";
import { Language } from "@/app/_types/Language";
import { CourseStatusToggle } from "@/app/_components/courses/FilterCoursesDialog";
import Restricted from "@/app/_components/access_control/Restricted";


interface FilterCoursesOptionsProps {
    teachers: Exclude<TeacherQuery, 'Subjects'>[],
    subjects: Subject[],

    /**currently teacher selected (if any) */
    teacher: string,
    /**function to be called when teacher selected or deselected */
    onTeacherChange: (value: string) => void

    /**currently subject selected (if any) */
    subject: string,
    /**function to be called when subject selected or deselected */
    onSubjectChange: (value: string) => void,

    /**currently course status or show all */
    status: CourseStatusToggle,
    /**function to be called when new status selected */
    onStatusChange: (value: CourseStatusToggle) => void,
}

/**This component shows based on which properties courses can be filtered
 * 
 * e.g. status, subject or teacher assign to the course
 */
const FilterCoursesOptions: React.FC<FilterCoursesOptionsProps> = ({
    status,
    onStatusChange,

    teachers,
    subjects,

    teacher,
    onTeacherChange,
    subject,
    onSubjectChange
}) => {

    const t = useTranslations()
    const locale = useLocale() as Language


    const courseStatusOptions: ToggleOption[] = [{
        value: 'all',
        label: t("filter.all")
    }, {
        value: CourseStatus.NotStarted,
        label: t("courseUpcoming")
    }, {
        value: CourseStatus.InProgress,
        label: t("courseOngoing")
    }, {
        value: CourseStatus.Completed,
        label: t("courseCompleted")
    }]


    return (
        <>
            <span>{t('filterByStatus')}</span>
            <AnimatedToggleGroup
                options={courseStatusOptions}
                defaultValue={status}
                onChange={(value: string) => onStatusChange(value as CourseStatusToggle)}
            />


            {/**filter based on a teacher or/and subjects, can be done only by managers  */}
            <Restricted
                action={Actions.readAny}
                resource={Resources.Course}
            >
                <span>{t('teacher')}</span>
                <div className="w-full lg:w-2/3">
                    <WrappedSelect
                        triggerPlaceholder={t('selectTeacher')}
                        searchPlaceholder={t('searchTeacher')}

                        defaultValue={teacher}
                        onValueChange={onTeacherChange}
                        options={teachers.map(t => ({
                            value: t.id,
                            label: t.User.firstName + ' ' + t.User.lastName
                        }))}
                    />
                </div>



                <span>{t('subject')}</span>
                <div className="w-full lg:w-2/3">
                    <WrappedSelect
                        triggerPlaceholder={t('selectSubject')}
                        searchPlaceholder={t('searchSubjects')}

                        defaultValue={subject}
                        onValueChange={onSubjectChange}
                        options={subjects.map(s => ({
                            value: String(s.id),
                            label: s[locale]
                        }))}
                    />
                </div>
            </Restricted>
        </>
    )
}

export default FilterCoursesOptions