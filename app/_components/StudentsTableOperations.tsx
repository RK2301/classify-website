import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import TableSearch from "@/app/_components/SearchInput"
import FilterStudnetsByClasses from "@/app/_components/FliterStudnetsByClasses"


const StudentsTableOperations = async () => {

    const t = await getTranslations()

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:basis-1/3">
                <TableSearch />
            </div>

            <div className="w-full md:w-1/2">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-[70%]">
                        <FilterStudnetsByClasses />
                    </div>

                    <div className="grow">
                        <Button asChild>
                            <Link href='/app/students/add'>
                                {t('addStudent')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsTableOperations