'use client'

import Link from "next/link";
import { useTranslations } from "next-intl";
import { HiUserGroup } from "react-icons/hi2";
import { MdCalendarToday } from "react-icons/md";
import { FaUserGraduate, FaClipboardCheck } from "react-icons/fa";

import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol";

import AddMaterialForm from "@/app/_components/courses/course_details/AddMaterialForm";
import Restricted from "@/app/_components/access_control/Restricted";
import ButtonGroup from "@/app/_components/ButtonGroup";
import { usePathname } from "next/navigation";


interface CourseGroupButtonProps {
    courseId: number
}

/**This component display a group of buttons for course page
 * 
 * view teachers assigned
 * 
 * view students enrolled
 * 
 * view lessons
 * 
 * attendance
 * 
 * add material
 */
const CourseGroupButton: React.FC<CourseGroupButtonProps> = ({ courseId }) => {

    const t = useTranslations()
    const pathname = usePathname()


    const buttons = [
        {
            Icon: MdCalendarToday,
            label: t('lessons'),
            link: `/app/courses/${courseId}/lessons`
        },
        {
            Icon: FaClipboardCheck,
            label: t('attendance'),
            link: `/app/courses/${courseId}/attendance`
        },
        {
            Icon: HiUserGroup,
            label: t('teachers'),
            link: `/app/courses/${courseId}/teachers`
        },
        {
            Icon: FaUserGraduate,
            label: t('students'),
            link: `/app/courses/${courseId}/students`
        }
    ]

    return (
        <div className="flex justify-center items-center gap-2 
        fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12
        md:static md:translate-x-0 md:bottom-0 md:left-0 md:w-full
        z-10 md:z-0
        ">

            <div className="w-4/5 my-1.5">
                <ButtonGroup>

                    {buttons.map((button, index) => (
                        <ButtonGroup.Button
                            key={index}
                            className={pathname.includes(button.link) ?
                                'font-bold [&_span]:text-brand-500 [&_svg]:scale-[115%]' : ''}
                            asChild
                        >
                            <Link href={button.link}>
                                <button.Icon className="size-6" />
                                <span>{button.label}</span>
                            </Link>
                        </ButtonGroup.Button>
                    ))}

                </ButtonGroup>
            </div>

            {/**Only Teacher & Manager can add a material */}
            <Restricted action={[Actions.createOwn, Actions.createAny]} resource={Resources.Materials}>
                <div className="w-1/5 self-stretch">
                    <AddMaterialForm courseId={courseId} />
                </div>
            </Restricted>

        </div>
    )
}

export default CourseGroupButton