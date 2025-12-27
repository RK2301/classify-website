'use client'
import { MdFilterList } from "react-icons/md";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { TeacherQuery } from "@rkh-ms/classify-lib";
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"
import { Subject } from "@rkh-ms/classify-lib/interfaces";
import { CourseStatus } from "@rkh-ms/classify-lib/enums";

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FilterCoursesOptions from "@/app/_components/courses/FilterCoursesOptions";
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams";
import { SearchParams } from "@/app/_utils/SearchParams";
import useRequest from "@/app/_hooks/use-request";
import { GetSubjects } from "@/app/_actions/getSubjects";
import { GetAllTeachers } from "@/app/_actions/getAllTeachers";
import ListSkeleton from "@/app/_components/Skeletons/listSkeleton";
import { usePermission } from "@/app/_hooks/use-permission";


/**This type describe values that course status toggle can have
 * 
 * which are NotStarted, InProgress , Completed & all (when want to show all courses)
 */
export type CourseStatusToggle = CourseStatus | 'all'



const FilterCourses = () => {

    const t = useTranslations()
    const [open, setOpen] = useState<boolean>(false)
    const [teachers, setTeachers] = useState<TeacherQuery[]>([])
    const [subjects, setSubjects] = useState<Subject[]>([])

    const [isPending, startTransition] = useTransition()
    const { getSearchParam, setMultipleParams } = useClassifyCustomSearchParams()

    /**only manager can filter based on subjects & teachers
     * 
     * so if user is doesn't have manager access, then no need to make a call to get teachers & subjects.
     */
    const hasAccess = usePermission(Actions.readAny, Resources.Course)

    const { doRequest } = useRequest<{
        teachers: Exclude<TeacherQuery, 'Subjects'>[],
        subjects: Subject[]
    }>({
        onSuccess(res) {
            setTeachers(res?.teachers || [])
            setSubjects(res?.subjects || [])
        }
    })

    /**state variable to store which status of courses selected to filter courses based on
     * e.g. completed, ongoing, not started
     */
    const [status, setStatus] = useState<CourseStatusToggle>(getSearchParam(SearchParams.CourseStatus) as CourseStatusToggle || 'all')

    /**State variable to store which teacher to filter courses based on (if any teacher selected) */
    const [teacher, setTeacher] = useState<string>(getSearchParam(SearchParams.TeacherId) || '')

    /**State variable to store which subject to filter courses based on (if any subject selected) */
    const [subject, setSubject] = useState<string>(getSearchParam(SearchParams.CourseFilterSubjectId) || '')


    /**Function to handle dialog open/ close state
     * when opened then fetch subjects and teachers to allow future filter
     */
    const onOpenChange = (isOpen: boolean) => {

        if (isOpen && hasAccess)
            startTransition(() => doRequest(async () => {
                const subjects = await GetSubjects()
                const teachers = await GetAllTeachers()

                return {
                    teachers,
                    subjects
                }
            }))

        setOpen(isOpen)
    }


    /**Function to be called when apply button pressed
     * so new filters will be applied to the courses
     */
    const handleApply = () => {

        setMultipleParams([{
            key: SearchParams.TeacherId,
            value: teacher
        }, {
            key: SearchParams.CourseFilterSubjectId,
            value: subject
        }, {
            key: SearchParams.CourseStatus,
            value: status === 'all' ? '' : status
        }])

    }


    /**store number of filters applied on courses */
    let filtersApplied = 0

    // if status selected then increment counter by 1
    if (getSearchParam(SearchParams.CourseStatus) && getSearchParam(SearchParams.CourseStatus) !== 'all')
        filtersApplied++

    // if courses filtered based on teacher, then increment counter by 1
    if (getSearchParam(SearchParams.TeacherId))
        filtersApplied++

    // if courses filtered based on subject then increment counter by 1
    if (getSearchParam(SearchParams.CourseFilterSubjectId))
        filtersApplied++



    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger asChild>
                <Button variant={'outline'} className="w-full">
                    <MdFilterList size={22} />
                    <span>
                        {t('filterCounter')} {' '}
                        {filtersApplied > 0 && `(${filtersApplied})`}
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('filterDialogTitle')}</DialogTitle>
                </DialogHeader>

                {isPending && <ListSkeleton numberOfItems={3} />}

                {!isPending &&
                    (
                        <div className="grid grid-cols-[20%_1fr] gap-4 items-center">
                            <FilterCoursesOptions
                                status={status}
                                onStatusChange={setStatus}

                                teachers={teachers}
                                subjects={subjects}

                                teacher={teacher}
                                onTeacherChange={setTeacher}
                                subject={subject}
                                onSubjectChange={setSubject}
                            />
                        </div>
                    )}

                {!isPending && (
                    <DialogFooter>
                        <div className="flex justify-center items-center w-full mt-5">
                            <DialogClose
                                asChild
                                className="w-2/3 lg:w-2/5">

                                <Button onClick={handleApply}>
                                    {t('apply')}
                                </Button>

                            </DialogClose>
                        </div>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default FilterCourses