'use client'
import { useSubjectDrawerState } from "@/app/_context/SubjectDrawerState"
import { useIsMobile } from "@/app/_hooks/use-mobile"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import SubjectForm from "./SubjectForm"
import { Subject } from "@rkh-ms/classify-lib/interfaces"

interface SubjectFormContainerProps {
    subject: Subject | undefined
}

const SubjectFormContainer: React.FC<SubjectFormContainerProps> = ({
    subject
}) => {

    /* is curren screen mobile or small tablet */
    const isSmallScreen = useIsMobile(1023)
    const { open, onOpenChange } = useSubjectDrawerState()

    if (isSmallScreen)
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTitle></DrawerTitle>

                <DrawerContent className="p-1 px-3">
                    <SubjectForm subject={subject} />
                </DrawerContent>
            </Drawer>
        )

    // large screen
    return (
        <div className='grow flex justify-center items-center lg:sticky lg:top-4 lg:h-[calc(100vh-6rem)]'>
            <div className="basis-8/12">
                <SubjectForm subject={subject} />
            </div>
        </div>
    )
}

export default SubjectFormContainer