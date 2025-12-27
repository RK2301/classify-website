import BackSectionResetPassword from "@/app/_components/BackSectionResetPassword";
import ResetPasswordWrapper from "@/app/_components/ResetPasswordWrapper";
import SuccessResetPassword from "@/app/_components/SuccessResetPassword";


export const metadata = {
    title: 'Reset Password'
}


const ResetPassword = () => {


    return (
        <div
            className="h-screen flex items-center justify-center
                bg-[var(--color-grey-0)] md:bg-[var(--color-grey-100)] p-4 md:p-0">
            <div
                className="flex flex-col justify-start items-center
                bg-[var(--color-grey-0)] p-5 gap-4 rounded-md md:shadow-lg 
                basis-11/12 md:basis-4/12
                min-h-[90dvh] md:min-h-[75dvh]"
            >
                <BackSectionResetPassword />
                <ResetPasswordWrapper>
                    <SuccessResetPassword />
                </ResetPasswordWrapper>
            </div>
        </div>
    )
}

export default ResetPassword;