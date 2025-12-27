import { HiMiniUserGroup } from "react-icons/hi2"
// import { getTranslations } from "next-intl/server"

import { CourseQuery } from "@/app/_types/queriesTypes"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import Avatar from "@/app/_components/Avatar"
import { useTranslations } from "next-intl"

interface CourseTeachersProps {
    title: string
    teachers: CourseQuery["Teachers"]
}



const CourseTeachers: React.FC<CourseTeachersProps> =  ({ title, teachers }) => {
    const t =  useTranslations()

    if (!teachers || teachers.length === 0) return null

    const first = teachers[0].User
    const extraCount = teachers.length - 1

    return (
        <div className="flex items-center gap-3">
            {/* avatar for first teacher */}
            <div className="flex items-center gap-3">
                <Avatar firstName={first.firstName} lastName={first.lastName} />

                <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                        {first.firstName + " " + first.lastName}
                    </div>
                    <div className="text-xs text-[var(--color-grey-500)]">
                        {t("teacher")}
                    </div>
                </div>
            </div>

            {/* extra teachers trigger */}
            {extraCount > 0 && (
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            className="
                                ml-auto inline-flex items-center gap-2 text-sm px-2.5 py-1 rounded-full
                                border border-[var(--color-grey-200)] bg-[var(--color-grey-0)]/20
                                hover:brightness-95"
                            aria-label={`Show ${extraCount} more teachers`}
                            type="button"
                        >
                            <HiMiniUserGroup size={16} />
                            <span className="font-medium">{`+${extraCount}`}</span>
                            <span className="sr-only"> {t("more")}</span>
                        </button>
                    </DialogTrigger>

                    <DialogContent className="lg:w-1/4">
                        <DialogHeader>
                            <span className="font-semibold text-xl">{title}</span>
                        </DialogHeader>

                        <div className="flex flex-col gap-3 mt-4">
                            {teachers.map((teacher, idx) => (
                                <div key={idx} className="flex items-center gap-3">

                                    {/**teacher avatar */}
                                    <Avatar firstName={teacher.User.firstName} lastName={teacher.User.lastName} />

                                    {/**teacher name */}
                                    <div>
                                        <div className="font-medium">
                                            {teacher.User.firstName + " " + teacher.User.lastName}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

export default CourseTeachers
