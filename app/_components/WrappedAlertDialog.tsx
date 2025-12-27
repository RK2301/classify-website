'use client'
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";


type WrappedAlertDialogProps = {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    /**message to display as body of the alert dialog */
    message: string | React.ReactNode
    /**function to be called when user clicks on continue */
    onAccept: () => Promise<unknown | void>
    /**Message to show in the toast when the request resolved successfully */
    successMsg: string

    /**indeicate if the confirm button should be in danger satate (red) */
    danger?: boolean
}

const WrappedAlertDialog: React.FC<WrappedAlertDialogProps> = ({
    isOpen,
    setIsOpen,
    message,
    onAccept,
    successMsg,
    danger = false
}) => {
    const t = useTranslations()

    const handleClick = () => {
        toast.promise(onAccept, {
            loading: t('pleaseWait'),
            success: successMsg
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="bg-[var(--color-grey-0)]" >
                <AlertDialogHeader >
                    <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <div className="grid basis-2/5 grid-cols-2 gap-2">
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>

                        <AlertDialogAction
                            // className="bg-red-600 hover:bg-red-700"
                            danger={danger}
                            onClick={handleClick}>
                            {t('continue')}
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default WrappedAlertDialog