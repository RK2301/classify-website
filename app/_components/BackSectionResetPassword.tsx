'use client'
import BackButton from "@/app/_components/BackButton";
import { useTranslations } from "next-intl";


const BackSectionResetPassword = () => {
    const t = useTranslations()

    return (
        <div
            className="flex w-full gap-2 items-center"
        >
            <BackButton herf="/auth/login"/>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t('login')}</span>
        </div>
    )
}

export default BackSectionResetPassword