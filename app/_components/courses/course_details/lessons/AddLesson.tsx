'use client'

import { useState } from "react"
import { useTranslations } from "next-intl"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { LessonKeys } from "@rkh-ms/classify-lib/enums"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FormContainer from "@/app/_components/form_components/FormContainer"
import FormRow from "@/app/_components/form_components/FormRow"
import FormField from "@/app/_components/FormField"
import { Input } from "@/components/ui/input"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import useRequest from "@/app/_hooks/use-request"
import { addLessonAction } from "@/app/_actions/addLessonAction"


interface AddLessonProps {
    /**the selected date, which a new lesson will be added to */
    date: Date,
    /**id of course the lesson want to be added */
    courseId: number
}


interface AddLessonFormFields {
    [LessonKeys.START_TIME]: string,
    [LessonKeys.END_TIME]: string
}

const AddLesson: React.FC<AddLessonProps> = ({ date, courseId }) => {

    const t = useTranslations()
    const [open, setOpen] = useState<boolean>(false)

    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<AddLessonFormFields>()


    /**each time the dialog open or closes, reset the dialog */
    const handleOpenChange = () => {
        setOpen(open => !open)
        // reset the form
        reset()
    }

    const {
        resErrors,
        doRequest
    } = useRequest({
        onSuccess: () => {
            toast.success(t('addLessonSuccess'))

            // close the dialog
            handleOpenChange()
        }
    })

    const onSubmit = async (data: AddLessonFormFields) => {

        await doRequest(() => addLessonAction(courseId, {
            ...data,
            date: dayjs(date).format('YYYY-MM-DD')
        }))
    }


    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    {t('addLesson')}
                </Button>
            </DialogTrigger>

            <DialogContent className="lg:w-1/3 md:w-1/2">
                <DialogHeader>
                    <DialogTitle>
                        {t('addLesson')}
                    </DialogTitle>

                    <DialogDescription className="font-medium">
                        {t('addLessonDescription', {
                            date: dayjs(date).format('DD/MM/YYYY')
                        })}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>
                        <FormRow cols={2}>

                            {/** start time */}
                            <FormField
                                label={t('startTime')}
                                error={errors[LessonKeys.START_TIME]?.message || resErrors[LessonKeys.START_TIME]}
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
                                {t('add')}
                            </SubmitButton>
                        </SubmitButtonContainer>
                    </FormContainer>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddLesson