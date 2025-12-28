'use client'

import React, { createContext, useContext, useState } from "react"
import { useTranslations } from "next-intl";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import {
    Control,
    Controller,
    FieldErrors,
    useForm,
    UseFormGetValues,
    UseFormRegister
} from "react-hook-form";
import FormField from "@/app/_components/FormField"
import { Input } from "@/components/ui/input";
import useRequest from "@/app/_hooks/use-request";
import { useClientAxios } from "@/app/_utils/useClientAxios";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import ResetPasswordForm from "@/app/_components/ResetPasswordForm";
import Stepper from "@/app/_components/Stepper";

export type Inputs = {
    step1: {
        id: string
    },
    step2: {
        prc: string
    },
    step3: {
        password: string,
        confirmPassword: string
    }
}

type StepKey = keyof Inputs
// type StepNumber = 1 | 2 | 3 | 4

type ResetPasswordContextStructure = {
    successMsg?: string;
    resErrors: Record<string, string>,
    reset: () => void
};

const ResetPasswordWrapperContext = createContext<ResetPasswordContextStructure | undefined>(undefined)


const stepVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
};

const ResetPasswordWrapper = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState(1)
    const nextStep = () => setStep(s => s + 1)
    const reset = () => setStep(1)

    /**save server response to reset password request made at the first step*/
    const [successEmailMsg, setSuccessEmailMsg] = useState<string | undefined>('')

    const axiosInst = useClientAxios()
    const {
        doRequest,
        resErrors
    } = useRequest({
        onSuccess: () => {
            nextStep()
        }
    })

    const t = useTranslations()
    const steps = [
        { title: t('step1Title') },
        { title: t('step2Title') },
        { title: t('step3Title') },
        { title: t('step4Title') },
    ];

    function handleNext(data: Inputs[StepKey]) {
        switch (step) {
            case 1:
                const form1Data = data as Inputs['step1']
                doRequest(async () => {
                    const res = await axiosInst(`https://${process.env.HOST}/api/reset-password/request`, {
                        method: 'POST',
                        data: JSON.stringify(form1Data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const data = res.data as { message: string }
                    setSuccessEmailMsg(data.message)
                })
                break;

            case 2:
                const form2Data = data as Inputs['step2']
                doRequest(async () => {
                    await axiosInst(`https://${process.env.HOST}/api/reset-password/verify`, {
                        method: 'POST',
                        data: JSON.stringify(form2Data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                })
                break;

            case 3:
                const form3Data = data as Inputs['step3'];
                doRequest(async () => {
                    await axiosInst(`https://${process.env.HOST}/api/reset-password/reset`, {
                        method: 'PUT',
                        data: JSON.stringify(form3Data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                })
                break;


        }
    }

    return (
        <ResetPasswordWrapperContext.Provider
            value={{
                successMsg: successEmailMsg,
                resErrors,
                reset
            }}
        >
            <Stepper steps={steps} currentStep={step - 1} />

            <AnimatePresence mode="wait">
                {step < 4 &&
                    <motion.div
                        key={`step-form-${step}`} // A unique key is crucial
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="w-full flex-grow flex flex-col" // Added classes for layout consistency
                    >
                        <StepForm
                            stepKey={`step${step}` as StepKey}
                            onNext={handleNext}
                        />
                    </motion.div>}
                {step === 4 && children}
            </AnimatePresence>
        </ResetPasswordWrapperContext.Provider>
    )
}

const useResetPassword = () => {
    const val = useContext(ResetPasswordWrapperContext)
    if (!val)
        throw new Error('useResetPassword can\'nt be used outside ResetPasswordWrapper')

    return val
}

function StepForm<K extends StepKey>({
    stepKey,
    onNext
}: {
    stepKey: K,
    onNext: (data: Inputs[K]) => void
}) {

    const t = useTranslations()
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: {
            isSubmitting,
            errors
        }
    } = useForm<Inputs[K]>()

    //function to reset progress and return to first step
    const { reset } = useResetPassword()

    return (
        <form
            className="flex flex-col gap-6 w-11/12 grow justify-between mx-auto"
            onSubmit={handleSubmit(onNext)}
        >
            <div></div>

            <div className="flex flex-col gap-4">
                {stepKey === 'step1' && <Step1Form errors={errors} register={register as unknown as UseFormRegister<Inputs['step1']>} />}
                {stepKey === 'step2' && <Step2Form control={control as unknown as Control<Inputs['step2'], unknown, Inputs['step2']>} />}
                {stepKey === 'step3' &&
                    <ResetPasswordForm register={register as unknown as UseFormRegister<Inputs['step3']>} errors={errors}
                        getValues={getValues as unknown as UseFormGetValues<Inputs['step3']>} control={control as unknown as Control<Inputs['step3'], unknown, Inputs['step3']>} />}
            </div>

            <div
                className="flex justify-between items-center w-full"
            >
                <div
                    className="basis-2/12"
                >
                    <Button
                        variant='secondary'
                        onClick={reset}
                        type='button'
                    >
                        {t('editId')}
                    </Button>
                </div>


                <div
                    className="basis-4/12 md:basis-3/12"
                >
                    <Button
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <BeatLoader size={10} /> : t('next')}
                    </Button>
                </div>

            </div>
        </form>
    )
}




/**This component represent first step in reset password process 
 * where user need to enter it's ID
 */
const Step1Form = ({
    errors,
    register
}: {
    errors: FieldErrors<Inputs['step1']>,
    register: UseFormRegister<Inputs['step1']>
}) => {

    const t = useTranslations()

    return (
        <FormField
            label={t('id')}
            error={errors.id?.message}
        >
            <Input
                type='text'
                className="w-full p-2"
                id='id'
                {...register('id', { required: t('required') })}
            />
        </FormField>
    )
}


/**This component represent the second step of reset passowrd proccess
 * where user needs to enter the 4 digits number sent to his mail
 */
const Step2Form = ({ control }: {
    control: Control<Inputs['step2'], unknown, Inputs['step2']>
}) => {
    const t = useTranslations()
    const { successMsg } = useResetPassword()

    return (
        <div className="flex flex-col gap-4">
            <Controller
                name='prc'
                control={control}
                rules={{
                    required: t('required')
                }}
                render={({ field: { value, onChange } }) => (
                    <InputOTP
                        maxLength={4}
                        value={value}
                        onChange={onChange}
                        pattern={REGEXP_ONLY_DIGITS}
                        className="w-full"
                        dir='ltr'
                    >
                        <InputOTPGroup
                            className="w-full">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                )}
            />
            <div className="flex flex-col">
                <span className="text-gray-400 text-sm">{successMsg}</span>
                <span className="text-gray-400 text-sm">* {t('codeExpires')}</span>
            </div>

        </div>
    )
}

export default ResetPasswordWrapper