'use client'

import { useTranslations } from "next-intl"
import { FieldErrors, Path, UseFormRegister } from "react-hook-form"

import { Input } from "@/components/ui/input"
import FormRow from "@/app/_components/form_components/FormRow"
import FormField from "@/app/_components/FormField"
import { UserFormFields } from "@/app/_types/formsFields"

type UserFieldsProps<T extends UserFormFields> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    resErrors: Record<string, string>
    /**indicate whenever fields shown in update mode
     ** it's helpful to disable the ID field as it can't be updated
     */
    updateMode?: boolean
}

/**This component render a form fields related to create a user
 ** fields are: ID, first name, last name, email, phone
 */
const UserFields = <T extends UserFormFields = UserFormFields>({
    register,
    errors,
    resErrors,
    updateMode = false
}: UserFieldsProps<T>) => {

    const t = useTranslations()

    /**function that convert error message from errors object to string */
    const fieldError = (k: keyof UserFormFields) => errors[k]?.message as string

    const getKey = <K extends keyof UserFormFields>(key: K) => key as unknown as Path<T>

    return (
        <>
            <FormRow>
                <FormField
                    label={t('id')}
                    error={fieldError('id') || resErrors?.id}
                    required
                >
                    <Input
                        id='id'
                        className="w-full"
                        autoComplete='off'
                        disabled={updateMode}
                        {...register(getKey('id'), {
                            required: t('required'),
                            pattern: {
                                message: t('validation.numbersOnly', { field: t('id') }),
                                value: /^[0-9]+$/
                            }
                        })}
                    />
                </FormField>

                <FormField
                    label={t('givenName')}
                    error={fieldError('firstName') || resErrors.firstName}
                    required
                >
                    <Input
                        id='firstName'
                        {...register(getKey('firstName'), {
                            required: t('required'),
                            pattern: {
                                value: /^[\p{L} '-]+$/u,
                                message: t('validation.onlyLetters', { field: t('givenName') })
                            }
                        })}
                    />
                </FormField>

                <FormField
                    label={t('familyName')}
                    error={fieldError('lastName') || resErrors.lastName}
                    required
                >
                    <Input
                        id='lastName'
                        {...register(getKey('lastName'), {
                            required: t('required')
                        })}
                    />
                </FormField>

            </FormRow>

            <FormRow>
                <FormField
                    label={t('email')}
                    error={fieldError('email') || resErrors.email}
                    required
                >
                    <Input
                        id='email'
                        // type='email'
                        {...register(getKey('email'), {
                            required: t('required')
                        })}
                    />
                </FormField>

                <FormField
                    label={t('phone')}
                    error={fieldError('phone') || resErrors.phone}
                >
                    <Input
                        id='phone'
                        {...register(getKey('phone'), {
                            validate: (value) => {
                                return !value || /^[0-9]+$/.test(value) || t('validation.numbersOnly', { field: t('phone') })
                            }
                        })}
                    />
                </FormField>
            </FormRow>
        </>
    )
}

export default UserFields