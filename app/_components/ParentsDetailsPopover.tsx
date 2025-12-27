'use client'
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"


import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"
import { useState } from "react"

type ParentsDetailsPopoverProps = {
    parents: {
        fatherName?: string
        fatherPhone?: string
        motherName?: string
        motherPhone?: string
    }
}

/**This component render a popver that show's parents details such as father & mother names and phones numbers
 * 
 * it's for use mainly for students table
  */
const ParentsDetailsPopover: React.FC<ParentsDetailsPopoverProps> = ({ parents }) => {

    const { motherName, motherPhone, fatherName, fatherPhone } = parents
    const t = useTranslations()
    const [isOpen, setIsOpen] = useState(false);


    const parentsInfo: { header: 'father' | 'mother', label: string }[] = [
        {
            header: 'father',
            label: t('father')
        },
        {
            header: 'mother',
            label: t('mother')
        }
    ]

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>

            <PopoverTrigger asChild>
                <Button
                    variant='link'
                    className={`hover:bg-transparent hover:underline
                        transition-all duration-300
                         p-0 ${isOpen ? 'text-brand-400' : ''}`}
                >
                    {t('details')}
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <div
                    className="flex flex-col gap-3"
                >
                    <h2 className="font-semibold text-xl">{t('parentContacts')}</h2>

                    {parentsInfo.map((p, ind) => {
                        const isFather = p.header === 'father'
                        /**variable saves if the the element render is the last one in the array
                         * 
                         * if so then no need to show a Separator
                         */
                        const isLast = ind === parentsInfo.length - 1

                        return (
                            <div key={p.header} className="flex flex-col gap-3">
                                <div>
                                    <h3 className="text-lg">{p.label}</h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 basis-1/2">
                                            <Header>{t('name')}</Header>
                                            <HeaderValue>{isFather ? fatherName : motherName}</HeaderValue>
                                        </div>

                                        <div className="flex items-center gap-1 grow">
                                            <Header>{t('phone')}</Header>
                                            <HeaderValue>{isFather ? fatherPhone : motherPhone}</HeaderValue>
                                        </div>
                                    </div>
                                </div>

                                {!isLast && <Separator />}
                            </div>
                        )
                    })}

                </div>
            </PopoverContent>
        </Popover>
    )
}

/**This component to show a header for a information related to the parents such as Name or Phone
 * 
 * usage: `<Header>{t('name')}</Header>` Will show -> Name: 
 */
const Header = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="text-sm">{children}:</span>
    )
}

/**This component to show value for a header in the Popover such as name or phone */
const HeaderValue = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="text-[var(--color-grey-600)]">
            {children}
        </span>
    )
}

export default ParentsDetailsPopover