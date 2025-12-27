'use client'

import { Language } from "@/app/_types/Language";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Subject } from "@rkh-ms/classify-lib/interfaces";
import { useLocale } from "next-intl";
import { useState } from "react";


/**This component show list of subject for teacher inside a Popover
 * 
 * note: This only works for teachers that has more than one subject
 */
const SubjectsList = ({
    subjects
}: {
    subjects: Subject[]
}) => {

    const [open, onOpenChange] = useState<boolean>(false)
    const locale = useLocale() as Language

    if (subjects.length <= 1)
        return null

    return (
        <Popover open={open} onOpenChange={onOpenChange} modal>
            <PopoverTrigger asChild>
                <a className={`flex items-center gap-1 text-[var(--color-grey-500)]
                                    hover:underline cursor-pointer
                                    transition-all duration-100
                                    ${open ? 'text-brand-500 scale-95' : ''}`}>
                    (+ {subjects.length - 1})
                </a>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-auto bg-[var(--color-grey-100)]">
                <ol className="flex flex-col gap-1.5 list-none">

                    {subjects.map(s => (
                        <li
                            key={s.id}
                            className="px-3 py-1 not-first:border-t-[1px]
                                        "
                        >
                            {s[locale]}
                        </li>
                    ))}

                </ol>
            </PopoverContent>
        </Popover>
    )
}

export default SubjectsList