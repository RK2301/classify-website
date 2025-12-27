'use client'
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { MdErrorOutline } from "react-icons/md";


const Error = ({
    error,
    reset
}: {
    error: Error,
    reset: () => void
}) => {

    const t = useTranslations()

    console.log(error);

    return (
        <div
            className="h-full w-full
            flex items-center justify-center"
        >
            <div
                className="flex flex-col items-center gap-4"
            >
                <MdErrorOutline className="text-red-600" size={60} />
                <h2 className="font-semibold text-2xl ">{t('somethingWrong')}</h2>

                <Button
                    onClick={() => reset()}
                >
                    {t('tryAgain')}
                </Button>
            </div>
        </div>
    )
}

export default Error