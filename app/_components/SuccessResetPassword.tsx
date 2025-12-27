import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi2";

const SuccessResetPassword = async () => {
    const t = await getTranslations()

    return (
        <div
            className="flex flex-col grow
            justify-between items-center"
        >
            <div></div>

            {/**Show huge success icon in green with message that reset success */}
            <div className="flex flex-col items-center">
                <HiCheckCircle className="text-green-600" size={100} />
                <span className="text-center text-gray-400">
                    {t('passwordResetSuccess')}
                </span>
            </div>

            {/**show button to back to Login page */}
            <div
                className="flex justify-center items-center"
            >
                <Link
                    href='/auth/login'
                >
                    <Button>
                        {t('backToLogin')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SuccessResetPassword