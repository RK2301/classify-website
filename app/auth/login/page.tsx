'use client'
import Logo from "@/app/_components/Logo"
import LoginForm from "@/app/_components/LoginForm"

import Link from "next/link"
import { motion } from "framer-motion" // npm i framer-motion
import { useTranslations } from "next-intl"


//#6D8EB6
//#3F72AF

// export const metadata = {
//     title: 'Login'
// }


const Login =  () => {
    const t =  useTranslations()

    return (
        <div
            className="h-screen flex items-center justify-center
                bg-[var(--color-grey-100)] p-4 md:p-0">
            
            {/* Login Box */}
            <motion.div
                className="flex flex-col justify-center items-center
                bg-[var(--color-grey-0)] p-4 gap-2 rounded-lg shadow-md
                basis-11/12 md:basis-1/2 lg:basis-1/3 xl:basis-1/4
                "
                // transition-all duration-300

                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.4,
                    scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce:0.5
                    }
                }}
            >
                <Logo />
                <LoginForm />

                <p
                    className="text-sm text-gray-400">
                    {t('resetPasswordMsg')} {' '}
                    <Link href="/auth/reset-password" className="text-brand-500 hover:underline">{t('resetPassword')}</Link>
                </p>
            </motion.div>

        </div>
    )
}

export default Login