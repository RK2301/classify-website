import { getTranslations } from "next-intl/server"

import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import { API } from "@rkh-ms/classify-lib/api"
import { TeacherAssignedStatus } from "@rkh-ms/classify-lib/enums"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

import Avatar from "@/app/_components/Avatar"
import List from "@/app/_components/List"
import { TeachersCourse } from "@/app/_types/queriesTypes"
import getServerAxios from "@/app/_utils/getServerAxios"
import { Button } from "@/components/ui/button"
import UnassignTeacher from "@/app/_components/courses/course_details/teachers/UnassignTeacher";
import AssignTeacher from "@/app/_components/courses/course_details/teachers/AssignTeacher"
import RestrictedServer from "@/app/_components/access_control/RestrictedServer"
import EntityStatusListItem from "@/app/_components/courses/course_details/EntityStatusListItem"
import WrappedEmpty from "@/app/_components/WrappedEmpty"
import { HiUserGroup } from "react-icons/hi2"
import Link from "next/link"



type TeachersCoursePageProps = {
    params: Promise<Record<string, string>>,
}


const TeachersCoursePage: React.FC<TeachersCoursePageProps> = async ({ params }) => {

    const t = await getTranslations()

    const p = await params
    const courseId = Number(p.courseId)

    const axios = await getServerAxios()

    // make request to get all teachers assign or unassigned to the course
    const { data } = await axios(API.teachers_course.getTeachersCourse(courseId))
    const teachers = data as TeachersCourse[]

    const assignedTeachers = teachers.filter(teacher => teacher.status === TeacherAssignedStatus.ASSIGNED)
    const unAssignedTeachers = teachers.filter(teacher => teacher.status === TeacherAssignedStatus.UN_ASSIGNED)

    return (
        <div className="flex flex-col gap-5 lg:px-9 pt-5">

            <div className="flex justify-between items-center gap-3">
                <span className="font-medium text-xl">{t('teachers')}</span>

                {/**only manager can assign teachers */}
                <RestrictedServer action={Actions.createAny} resource={Resources.TeacherCourse}>
                    <div className="basis-1/5">
                        <Button asChild>
                            <Link href={'teachers/assign'}>
                                {t('assignTeacher')}
                            </Link>
                        </Button>
                    </div>
                </RestrictedServer>
            </div>


            {/**list of teachers assigned */}
            {assignedTeachers.length > 0 &&
                <div className="flex flex-col gap-1">

                    <span className="text-sm font-medium ms-3 text-[var(--color-grey-700)]">{t('assignTeachers')}</span>
                    <List>
                        {assignedTeachers.map(teacher => (
                            <EntityStatusListItem
                                key={teacher.teacherId}
                                Avatar={
                                    <Avatar
                                        firstName={teacher.Teacher.User.firstName}
                                        lastName={teacher.Teacher.User.lastName}
                                    />
                                }
                                name={teacher.Teacher.User.firstName + ' ' + teacher.Teacher.User.lastName}
                                Description={<span className="text-sm text-[var(--color-grey-500)]">
                                    {dayjs(teacher.assigned_at, 'YYYY/MM/DD').format('DD/MM/YYYY')}
                                </span>}
                                ActionButton={
                                    <>
                                        {/**unassign button, only manager can unassign teachers */}
                                        <RestrictedServer action={Actions.updateAny} resource={Resources.TeacherCourse}>
                                            <UnassignTeacher courseId={courseId} teacherId={teacher.teacherId} />
                                        </RestrictedServer>
                                    </>
                                }
                            />
                        ))}
                    </List>
                </div>}

            {/**show empty message when no teacher assigned */}
            {assignedTeachers.length === 0 &&
                <WrappedEmpty
                    Icon={HiUserGroup}
                    title={t('assignTeacherEmptyTitle')}
                    description={t('assignTeacherEmptyDescription')}
                />
            }


            {/**Unassign teachers, only manager can view unassigned teachers */}
            {unAssignedTeachers.length > 0
                &&
                <RestrictedServer action={Actions.readAny} resource={Resources.TeacherCourse}>
                    <div className="flex flex-col gap-1">

                        <span className="text-sm font-medium ms-3 text-[var(--color-grey-700)]">{t('unAssignedTeachers')}</span>

                        <List>
                            {unAssignedTeachers.map(teacher => (

                                <EntityStatusListItem
                                    key={teacher.teacherId}
                                    Avatar={<Avatar
                                        firstName={teacher.Teacher.User.firstName}
                                        lastName={teacher.Teacher.User.lastName}
                                    />}
                                    name={teacher.Teacher.User.firstName + ' ' + teacher.Teacher.User.lastName}
                                    Description={
                                        <>
                                            <span className="text-sm">
                                                {dayjs(teacher.assigned_at, 'YYYY/MM/DD').format('DD/MM/YYYY')}
                                            </span>

                                            <span>-</span>

                                            <span className="text-sm">
                                                {dayjs(teacher.unAssigned_at, 'YYYY/MM/DD').format('DD/MM/YYYY')}
                                            </span>
                                        </>
                                    }
                                    ActionButton={
                                        <>
                                            {/**Assign button, only teacher can assign teachers */}
                                            <RestrictedServer action={Actions.updateAny} resource={Resources.TeacherCourse}>
                                                <AssignTeacher
                                                    courseId={courseId}
                                                    teacherId={teacher.teacherId}
                                                    teacherName={teacher.Teacher.User.firstName + ' ' + teacher.Teacher.User.lastName}
                                                />
                                            </RestrictedServer>
                                        </>
                                    }
                                />

                            ))}
                        </List>
                    </div>
                </RestrictedServer>
            }

        </div>
    )
}


export default TeachersCoursePage