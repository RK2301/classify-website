import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { FaUserGraduate } from "react-icons/fa"

import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import { API } from "@rkh-ms/classify-lib/api"
import { StundetEnrollmentStatus } from "@rkh-ms/classify-lib/enums"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

import Avatar from "@/app/_components/Avatar"
import List from "@/app/_components/List"
import { StudentsCourse } from "@/app/_types/queriesTypes"
import getServerAxios from "@/app/_utils/getServerAxios"
import { Button } from "@/components/ui/button"
import RestrictedServer from "@/app/_components/access_control/RestrictedServer"
import EntityStatusListItem from "@/app/_components/courses/course_details/EntityStatusListItem"
import WrappedEmpty from "@/app/_components/WrappedEmpty"
import WithdrawalStudent from "@/app/_components/courses/course_details/students/WithdrawalStudent"
import EnrollStudentDialog from "@/app/_components/courses/course_details/students/EnrollStudentDialog"
import { Separator } from "@/components/ui/separator"

export const metadata = {
    title: 'Students'
}

type StudentsCoursePageProps = {
    params: Promise<Record<string, string>>,
}


const StudentsCoursePage: React.FC<StudentsCoursePageProps> = async ({ params }) => {

    const t = await getTranslations()

    const p = await params
    const courseId = Number(p.courseId)

    const axios = await getServerAxios()

    // make request to get all students enrolled or withdrawal from the course
    const { data } = await axios(API.students_course.getCourseStudents(courseId))

    const students = data as StudentsCourse[]

    console.log(students.map(s => s.Student.User));


    const enrolledStudents = students.filter(student => student.status === StundetEnrollmentStatus.ACTIVE)
    const withdrawalStudents = students.filter(student => student.status === StundetEnrollmentStatus.WITHDRAWN)


    return (
        <div className="flex flex-col gap-5 lg:px-9 pt-5">

            <div className="flex justify-between items-center gap-3">
                <span className="font-medium text-xl">{t('students')}</span>

                {/**only manager can enrolled students */}
                <RestrictedServer action={Actions.createAny} resource={Resources.StudentCourse}>
                    <div className="basis-1/5">
                        <Button asChild>
                            <Link href={'students/enroll'}>
                                {t('enrollStudent')}
                            </Link>
                        </Button>
                    </div>
                </RestrictedServer>
            </div>


            {/**list of enrolled students*/}
            {enrolledStudents.length > 0 &&
                <div className="flex flex-col gap-1">

                    <span className="text-sm font-medium ms-3 text-[var(--color-grey-700)]">
                        {t('enrolledListTitle', {
                            count: enrolledStudents.length
                        })}
                    </span>

                    <List>
                        {enrolledStudents.map(student => (
                            <EntityStatusListItem
                                key={student.studentId}
                                Avatar={
                                    <Avatar
                                        firstName={student.Student.User.firstName}
                                        lastName={student.Student.User.lastName}
                                    />
                                }
                                name={student.Student.User.firstName + ' ' + student.Student.User.lastName}

                                Description={
                                    <>
                                        <span>{student.Student.grade <= 12 ? t('classNumber', {
                                            num: student.Student.grade
                                        }) : t('graduated')}</span>

                                        <div className="h-10/12">
                                            <Separator orientation='vertical' />
                                        </div>


                                        <span>
                                            {dayjs(student.enrolled_at, 'YYYY/MM/DD').format('DD/MM/YYYY')}
                                        </span>
                                    </>
                                }

                                ActionButton={
                                    <>
                                        {/**withdrawal button, only manager can withdrawal students */}
                                        <RestrictedServer action={Actions.updateAny} resource={Resources.StudentCourse}>
                                            <WithdrawalStudent
                                                courseId={courseId}
                                                studentId={student.studentId}
                                                studentName={student.Student.User.firstName + ' ' + student.Student.User.lastName}
                                            />
                                        </RestrictedServer>
                                    </>
                                }
                            />
                        ))}
                    </List>
                </div>}

            {/**show empty message when no students enrolled */}
            {enrolledStudents.length === 0 &&
                <WrappedEmpty
                    Icon={FaUserGraduate}
                    title={t('emptyEnrollTitle')}
                    description={t('emptyEnrollDescription')}
                />
            }


            {/**Withdrawal students, only manager can view withdrawal students */}
            {withdrawalStudents.length > 0
                &&
                <RestrictedServer action={Actions.readAny} resource={Resources.StudentCourse}>
                    <div className="flex flex-col gap-1">

                        <span className="text-sm font-medium ms-3 text-[var(--color-grey-700)]">
                            {t('withdrawnListTitle')}
                        </span>

                        <List>
                            {withdrawalStudents.map(student => (

                                <EntityStatusListItem
                                    key={student.studentId}

                                    Avatar={<Avatar
                                        firstName={student.Student.User.firstName}
                                        lastName={student.Student.User.lastName}
                                    />}

                                    name={student.Student.User.firstName + ' ' + student.Student.User.lastName}

                                    Description={
                                        <>
                                            <span className="text-sm">{student.Student.grade <= 12 ? t('classNumber', {
                                                num: student.Student.grade
                                            }) : t('graduated')}</span>

                                            <div className="h-10/12">
                                                <Separator orientation='vertical' />
                                            </div>

                                            <div className="flex items-center gap-0.5 text-sm">
                                                <span>
                                                    {dayjs(student.enrolled_at, 'YYYY/MM/DD').format('DD/MM/YYYY')}
                                                </span>

                                                <span>-</span>

                                                <span>
                                                    {dayjs(student.withDrawalDate, 'YYYY/MM/DD').format('DD/MM/YYYY')}
                                                </span>
                                            </div>
                                        </>
                                    }

                                    ActionButton={
                                        <>
                                            {/**enroll button, only manager can enroll students */}
                                            <RestrictedServer action={Actions.updateAny} resource={Resources.StudentCourse}>
                                                <EnrollStudentDialog
                                                    courseId={courseId}
                                                    studentId={student.studentId}
                                                    studentName={student.Student.User.firstName + ' ' + student.Student.User.lastName}
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


export default StudentsCoursePage