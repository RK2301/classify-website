'use client'

import { Input } from "@/components/ui/input"
import FormField from "./FormField"
import { useTranslations } from "next-intl"
import { Control, FieldErrors, UseFormGetValues, UseFormRegister, useWatch } from "react-hook-form"
import { Inputs } from "./ResetPasswordWrapper"

type ResetPasswordFormProps = {
    register: UseFormRegister<Inputs['step3']>;
    errors: FieldErrors<Inputs['step3']>;
    getValues: UseFormGetValues<Inputs['step3']>;
    control: Control<Inputs['step3'], unknown, Inputs['step3']>
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
    register,
    errors,
    getValues,
    control
}) => {
    const t = useTranslations()

    //watch the password field to update conditions
    const password = useWatch({ control, name: 'password' })

    //decide if the password meet the confitions
    const conditions = [
        {
            condition: password?.length >= 8,
            label: t('atLeast8Chars')
        },
        {
            condition: /[A-Z]/.test(password),
            label: t('atLeast1Capital')
        },
        {
            condition: /[a-z]/.test(password),
            label: t('atLeast1Small')
        },
        {
            condition: /[0-9]/.test(password),
            label: t('atLeast1Number')
        }
    ]


    return (
        <>
            <div
                className="flex flex-col gap-2"
            >
                <FormField
                    label={t('password')}
                    error={errors.password?.message}
                >
                    <Input
                        type='password'
                        className="w-full p-2"
                        id='password'
                        {...register('password', {
                            required: t('required'),
                            validate: () => !conditions.some(con => !con.condition) || t('passwordNotMeetConditions')
                        })}
                    />
                </FormField>

                <ol className="list-none">
                    {conditions.map(con => (
                        <li
                            key={con.label}
                            className={`${con.condition ? 'text-green-500' : 'text-gray-400'}`}
                        >
                            {con.label}
                        </li>

                    ))}
                </ol>
            </div>


            <FormField
                label={t('confirmPassword')}
                error={errors.confirmPassword?.message}
            >
                <Input
                    type='password'
                    className="w-full p-2"
                    id='confirmPassword'
                    {...register('confirmPassword', {
                        required: t('required'),
                        validate: (value) =>
                            getValues().password === value || t('passwordsNotMatch')
                    })}
                />
            </FormField>
        </>
    )
}

export default ResetPasswordForm