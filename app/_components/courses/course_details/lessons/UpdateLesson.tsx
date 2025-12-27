'use client'

import { useTranslations } from "next-intl"
import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { CalendarIcon } from "lucide-react"

import { LessonKeys } from "@rkh-ms/classify-lib/enums"
import { Lesson } from "@rkh-ms/classify-lib/interfaces"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FormContainer from "@/app/_components/form_components/FormContainer"
import FormRow from "@/app/_components/form_components/FormRow"
import FormField from "@/app/_components/FormField"
import { Input } from "@/components/ui/input"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import useRequest from "@/app/_hooks/use-request"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { updateLessonAction } from "@/app/_actions/updateLessonAction"


interface UpdateLessonProps {
    /**The lesson to be updated */
    lesson: Lesson,
    open: boolean,
    onOpenChange: (open: boolean) => void
}


interface UpdateLessonFormFields {
    date: Date,
    [LessonKeys.START_TIME]: string,
    [LessonKeys.END_TIME]: string
}


/**This component opens a dialog to give option to update lesson details such as: date, start & end time */
const UpdateLesson: React.FC<UpdateLessonProps> = ({ open, onOpenChange, lesson }) => {

    const t = useTranslations()
    const courseId = lesson.course_id

    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<UpdateLessonFormFields>({
        defaultValues: {
            date: new Date(lesson.startTime),
            startTime: dayjs(lesson.startTime).format('HH:mm'),
            endTime: dayjs(lesson.endTime).format('HH:mm')
        }
    })


    const {
        resErrors,
        doRequest
    } = useRequest({
        onSuccess: () => {
            toast.success(t('updateLessonSuccess'))

            // close the dialog
            onOpenChange(false)
        }
    })

    const onSubmit = async (data: UpdateLessonFormFields) => {

        await doRequest(() => updateLessonAction(courseId, lesson.id, {
            ...data,
            date: dayjs(data.date).format('YYYY-MM-DD')
        }))
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:w-1/3 md:w-1/2">

                <DialogHeader>
                    <DialogTitle>
                        {t('updateLessonTitle')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>

                        {/**select date */}
                        <FormRow cols={2}>
                            <FormField
                                label={t('lessonDate')}
                                required
                                error={errors.date?.message || resErrors?.date}
                            >
                                <Controller
                                    name='date'
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
                                                    {field.value ? dayjs(field.value).format('DD/MM/YYYY') : t('courseStartDate')}

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
                        </FormRow>

                        <FormRow cols={2}>

                            {/** start time */}
                            <FormField
                                label={t('startTime')}
                                error={errors[LessonKeys.START_TIME]?.message || resErrors[LessonKeys.START_TIME]}
                                required
                            >
                                <Input
                                    type='time'
                                    {...register('startTime', {
                                        required: t('required')
                                    })}
                                />
                            </FormField>

                            {/**end time */}
                            <FormField
                                label={t('endTime')}
                                error={errors[LessonKeys.END_TIME]?.message || resErrors[LessonKeys.END_TIME]}
                                required
                            >
                                <Input
                                    type='time'
                                    {...register('endTime', {
                                        required: t('required')
                                    })}
                                />
                            </FormField>

                        </FormRow>

                        <SubmitButtonContainer>
                            <SubmitButton
                                disabled={isSubmitting}
                                isSubmitting={isSubmitting}
                            >
                                {t('update')}
                            </SubmitButton>
                        </SubmitButtonContainer>
                    </FormContainer>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default UpdateLesson