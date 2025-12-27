'use client'

import { usePathname } from "next/navigation"

interface CourseInfoProps {
    children?: React.ReactNode,
    courseId: number
}

/**This component receives the course details card and last 6 lesson card
 * 
 * and decide for small screens or medium screens to hide them 
 * 
 * when navigate away for the course home screen (materials screen)
 * 
 * for large screens, always show them
 */
const CourseInfo: React.FC<CourseInfoProps> = ({ children, courseId }) => {

    const pathname = usePathname()
    const isCourseHome = pathname.endsWith(`/courses/${courseId}`)

    return (
        <div className={`flex flex-col gap-4 
        ${isCourseHome ? '' : 'hidden lg:flex'}`}>
            {children}
        </div>
    )
}

export default CourseInfo;