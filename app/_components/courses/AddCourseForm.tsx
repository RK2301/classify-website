'use client'

import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useLocale, useTranslations } from "next-intl"
import dayjs from "dayjs"
import { AlertCircleIcon, CalendarIcon } from "lucide-react"
import { HiMiniPlus } from "react-icons/hi2";
import { MdDelete } from "react-icons/md"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { TeacherQuery } from "@rkh-ms/classify-lib"
import { Subject } from "@rkh-ms/classify-lib/interfaces"

import FormContainer from "@/app/_components/form_components/FormContainer"
import { CourseFormFields } from "@/app/_types/formsFields"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import FormRow from "@/app/_components/form_components/FormRow"
import FormField from "@/app/_components/FormField"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useDirection from "@/app/_hooks/use-direction"
import { Language } from "@/app/_types/Language"
import MultiSelect from "@/app/_components/MultiSelect"
import FormSeparator from "@/app/_components/form_components/FormSeparator"
import { Option } from "@/app/_types/ListOption"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import IconButton from "@/app/_components/IconButton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import useRequest from "@/app/_hooks/use-request"
import { addCourse } from "@/app/_actions/addCourse"




interface AddCourseFormProps {
    subjects: Subject[],
    teachers: Exclude<TeacherQuery, 'Subjects'>[]
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ subjects, teachers }) => {

    const t = useTranslations()
    const router = useRouter()

    const dir = useDirection()
    const locale = useLocale() as Language

    const daysOfWeek: Option[] = Array.from({ length: 7 }).map((_, index) => ({
        value: index.toString(),
        label: new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(2024, 0, 7 + index))
    }))

    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<CourseFormFields>({
        defaultValues: {
            teachers: [],
            lessons: [{ day: '' as unknown as number, startTime: '', endTime: '' }]
        }
    })

    /**Functions to add, delete meetings inputs */
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: 'lessons'
    })

    const { doRequest, resErrors } = useRequest({
        onSuccess: () => {
            toast.success(t('courseAddSuccess'))

            // nav to courses page
            router.push('/app/courses')
        },
    })

    const onSubmit = async (values: CourseFormFields) => {
        console.log(values);

        console.log(dayjs(values.startDate).format('YYYY-MM-DD'));

        await doRequest(() => addCourse({
            ...values,
            startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
        }))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FormContainer>

                <FormRow>
                    <FormField
                        label={t('courseTitle')}
                        required
                        error={errors.title?.message || resErrors?.title}
                    >
                        <Input
                            id='title'
                            className="dark:bg-(--color-grey-0)/70 bg-white/50"
                            {...register('title', {
                                required: t('required')
                            })}
                        />
                    </FormField>


                    <FormField
                        label={t('startDate')}
                        required
                        error={errors.startDate?.message || resErrors?.startDate}
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
                                            {field.value ? dayjs(field.value).format('DD/MM/YYYY') :
                                            <span className="text-(--color-grey-500)">{t('courseStartDate')}</span>}

                                            <CalendarIcon />
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto h-auto md:max-h-[45dvh] md:overflow-auto p-1">
                                        <Calendar
                                            mode='single'
                                            selected={field.value}
                                            onSelect={field.onChange}
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </FormField>

                    <FormField
                        label={t('numberOfLessons')}
                        required
                        error={errors.numberOfLessons?.message || resErrors?.numberOfLessons}
                    >
                        <Input
                            id='numberOfLessons'
                            type='number'
                            {...register('numberOfLessons', {
                                required: t('required')
                            })}
                        />
                    </FormField>

                </FormRow>

                <FormRow>
                    <FormField
                        label={t('subject')}
                        required
                        error={errors.subjectId?.message || resErrors?.subjectId}
                    >
                        <Controller
                            control={control}
                            name='subjectId'
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
                                        <SelectValue placeholder='Select a subject' />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            {subjects.map(s =>
                                                <SelectItem
                                                    key={s.id}
                                                    value={(s.id.toString())}
                                                >
                                                    {s[locale]}
                                                </SelectItem>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>

                    <FormField
                        label={t('teachers')}
                        required
                        error={errors.teachers?.message || resErrors?.teachers}
                    >
                        <Controller
                            control={control}
                            name='teachers'
                            rules={{
                                required: t('required')
                            }}
                            render={({ field }) => (
                                <MultiSelect
                                    placeholder={t('selectTeachers')}
                                    searchPlaceholder={t('searchTeachers')}
                                    options={teachers.map(t => ({
                                        value: String(t.id),
                                        label: `${t.User?.firstName} ${t.User?.lastName}`
                                    }))}
                                    selected={field.value || ['']}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </FormField>

                </FormRow>

                <FormSeparator />

                {/**Second section of the form, which about add course meeting
                 * This done by choose day of week and times
                 * at least one meeting is required
                 */}
                <div className="w-full  flex items-center justify-center">
                    <Alert className="w-auto 
                    rounded-es-[0px] rounded-ss-[0px]
                    border-s-4 border-s-yellow-400
                    ">
                        <AlertCircleIcon />
                        <AlertTitle> {t('courseLessonsLimitTitle')} </AlertTitle>
                        <AlertDescription>
                            {t('courseLessonsLimit')}
                        </AlertDescription>
                    </Alert>
                </div>

                <FormRow cols={2}>
                    {fields.map((lesson, index) => {

                        const fieldError = errors.lessons?.[index]
                        const errorMsg = fieldError?.day?.message || fieldError?.startTime?.message || fieldError?.endTime?.message

                        return (
                            <FormField
                                key={index}
                                required
                                error={errorMsg}
                            >
                                <div className="flex items-center gap-1.5">
                                    <Controller
                                        control={control}
                                        name={`lessons.${index}.day`}
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
                                                    <SelectValue placeholder={t('selectDay')} />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        {daysOfWeek.map(d =>
                                                            <SelectItem
                                                                key={d.value}
                                                                value={(d.value)}
                                                            >
                                                                {d.label}
                                                            </SelectItem>
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />


                                    <Input
                                        type='time'
                                        placeholder="Start Time"
                                        {...register(`lessons.${index}.startTime`, {
                                            required: t('required'),
                                        })}
                                    />


                                    <Input
                                        type='time'
                                        placeholder="End Time"
                                        {...register(`lessons.${index}.endTime`, {
                                            required: t('required'),
                                            validate: (value) => {

                                                const startTime = getValues(`lessons.${index}.startTime`)

                                                if (!startTime)
                                                    return 'Set start time first'

                                                if (startTime >= value)
                                                    return 'End time must be after start time'

                                                return true
                                            }
                                        })}
                                    />

                                    {/**Add button - only for the first lesson input */}
                                    {index === 0 && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <IconButton
                                                    onClick={() => {
                                                        if (fields.length >= 5)
                                                            return

                                                        append({ day: '' as unknown as number, startTime: '', endTime: '' })
                                                    }}
                                                    disabled={fields.length >= 5}
                                                >
                                                    <HiMiniPlus size={20} />
                                                </IconButton>
                                            </TooltipTrigger>

                                            <TooltipContent>
                                                <span> {t('addLessson')} </span>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}


                                    {/**Delete Button, only for lessons input that after the first one */}
                                    {index > 0 && fields.length > 1 && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <IconButton
                                                    onClick={() => remove(index)}
                                                >
                                                    <MdDelete size={20} />
                                                </IconButton>
                                            </TooltipTrigger>

                                            <TooltipContent>
                                                <span>{t('deleteLesson')}</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            </FormField>
                        )
                    })}
                </FormRow>

                <SubmitButtonContainer>
                    <SubmitButton
                        isSubmitting={isSubmitting}
                    >
                        {t('add')}
                    </SubmitButton>
                </SubmitButtonContainer>
            </FormContainer>
        </form>
    )
}

export default AddCourseForm