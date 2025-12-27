'use client'

import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"
import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import FormRow from "@/app/_components/form_components/FormRow"
import FormField from "@/app/_components/FormField"
import { StudnetFormFields } from "@/app/_types/formsFields"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useDirection from "@/app/_hooks/use-direction"
import { useClassOptions } from "@/app/_hooks/useClassOptions"


type StudentFieldsProps = {
    register: UseFormRegister<StudnetFormFields>
    errors: FieldErrors<StudnetFormFields>
    resErrors: Record<string, string>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<StudnetFormFields, any, StudnetFormFields>
}

/**This component render fields related to add/ update student
 ** the fields: Class, father name & phone, mother name & phone
 */
const StudentFields: React.FC<StudentFieldsProps> = ({
    register,
    errors,
    resErrors,
    control
}) => {

    const t = useTranslations()
    const dir = useDirection()
    const classesOptions = useClassOptions()


    return (
        <>
            <FormRow>
                <FormField
                    label={t('class')}
                    error={errors.grade?.message || resErrors.grade}
                    required
                >
                    <Controller
                        name='grade'
                        control={control}
                        rules={{
                            required: t('required')
                        }}
                        render={({ field }) => (
                            <Select
                                dir={dir}
                                value={String(field.value)}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a class' />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {classesOptions.map(c =>
                                            <SelectItem
                                                key={c.value}
                                                value={(c.value)}
                                            >
                                                {c.label}
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </FormField>

                <FormField
                    label={t('fatherName')}
                    error={errors.fatherName?.message || resErrors.fatherName}
                >
                    <Input
                        id='FatherName'
                        {...register('fatherName', {
                            pattern: {
                                value: /^[\p{L} '-]+$/u,
                                message: t('validation.onlyLetters', { field: t('fatherName') })
                            }
                        })}
                    />
                </FormField>

                <FormField
                    label={t('fatherPhone')}
                    error={errors.fatherPhone?.message || resErrors.fatherPhone}
                >
                    <Input
                        id='fatherPhone'
                        {...register('fatherPhone', {
                            validate: (value) => {
                                return !value || /^[0-9]+$/.test(value) || t('validation.numbersOnly', { field: t('phone') })
                            }
                        })}
                    />
                </FormField>
            </FormRow>

            <FormRow>
                <FormField
                    label={t('motherName')}
                    error={errors.motherName?.message || resErrors.motherName}
                >
                    <Input
                        id='motherName'
                        {...register('motherName', {
                            pattern: {
                                value: /^[\p{L} '-]+$/u,
                                message: t('validation.onlyLetters', { field: t('motherName') })
                            }
                        })}
                    />
                </FormField>

                <FormField
                    label={t('motherPhone')}
                    error={errors.motherPhone?.message || resErrors.motherPhone}
                >
                    <Input
                        id='motherPhone'
                        {...register('motherPhone', {
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

export default StudentFields