'use client'
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form"

import FormRow from "@/app/_components/form_components/FormRow"
import { TeacherFormFields } from "@/app/_types/formsFields"
import FormField from "@/app/_components/FormField"
import { useLocale, useTranslations } from "next-intl"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import MultiSelect from "../MultiSelect"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import { Option } from "@/app/_types/ListOption"
import { Language } from "@/app/_types/Language"
import dayjs from "dayjs"

interface TeacherFieldsProps {
    register: UseFormRegister<TeacherFormFields>,
    errors: FieldErrors<TeacherFormFields>,
    resErrors: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<TeacherFormFields, any, TeacherFormFields>
    subjects: Subject[]
}


/**This component render 2 fields for teacher
 * 
 * one for start date selector
 * 
 * the second is multiselect, to select subjects teacher teach.
 */
const TeacherFields: React.FC<TeacherFieldsProps> = ({
    // register,
    errors,
    resErrors,
    control,
    subjects
}) => {

    const t = useTranslations()
    const locale = useLocale() as Language

    const options: Option[] = subjects.map(s => ({
        value: String(s.id),
        label: s[locale]
    }))

    return (
        <FormRow>
            <FormField
                label={t('joined')}
                required
                error={errors.startDate?.message || resErrors.startDate}
            >
                <Controller
                    name='startDate'
                    control={control}
                    rules={{
                        required: t('required')
                    }}
                    render={({ field }) => (
                        <Popover modal>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className="flex justify-between items-center gap-3"
                                >
                                    {field.value ? dayjs(field.value).format('DD/MM/YYYY') : t('selectJoinDate')}

                                    <CalendarIcon />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto h-auto md:max-h-[45dvh] md:overflow-auto p-1">
                                <Calendar
                                    mode='single'
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
            </FormField>

            <FormField
                label={t('subjects')}
                required
                error={errors.subjects?.message}
            >
                <Controller
                    control={control}
                    name='subjects'
                    rules={{
                        required: t('required')
                    }}
                    render={({ field }) => (
                        <MultiSelect
                            placeholder={t('selectSubjects')}
                            searchPlaceholder={t('searchSubjects')}
                            options={options}
                            selected={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </FormField>
        </FormRow>
    )
}

export default TeacherFields