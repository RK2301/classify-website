'use client'
import { HiArrowRightStartOnRectangle, HiArrowLeftStartOnRectangle } from "react-icons/hi2";
import { MdLockReset } from 'react-icons/md'
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";

import SplitButtons from "@/app/_components/SplitButtons"
import useDirection from "@/app/_hooks/use-direction";
import { useClientAxios } from "@/app/_utils/useClientAxios";
import useRequest from "@/app/_hooks/use-request";
import WrappedAlertDialog from "./WrappedAlertDialog";


const SettingsFooter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    const dir = useDirection()
    const t = useTranslations()
    const axios = useClientAxios()
    const { doRequest } = useRequest({
        toThrowError: true
    })

    const onAccept = async () => {
        await doRequest(async () => {
            //make request to sign out
            await axios('https://classify.dev/api/users/logout', {
                method: 'POST'
            })

            //redirect to login page
            router.push('/auth/login')
        })
    }

    return (
        <>
            <SplitButtons>
                <SplitButtons.Button
                    onClick={() => setIsOpen(true)}
                    Icon={dir === 'ltr' ?
                        HiArrowLeftStartOnRectangle : HiArrowRightStartOnRectangle}
                    danger
                >
                    {t('logout')}
                </SplitButtons.Button>

                <SplitButtons.Button
                    Icon={MdLockReset}
                >
                    {t('resetPassword')}
                </SplitButtons.Button>
            </SplitButtons>

            <WrappedAlertDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                message={t('logout_warning')}
                successMsg={t('logoutSuccess')}
                onAccept={onAccept}
                danger
            />
        </>

    )
}

export default SettingsFooter

{/* <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="bg-[var(--color-grey-0)]" >
                    <AlertDialogHeader >
                        <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('logout_warning')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <div className="grid basis-2/5 grid-cols-2 gap-2">
                            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                            <AlertDialogAction onClick={onAccept}>{t('continue')}</AlertDialogAction>
                        </div>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog> */}