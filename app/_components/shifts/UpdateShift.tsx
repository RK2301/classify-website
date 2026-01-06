'use client'

import { toast } from "sonner"
import { useTranslations } from "next-intl"
import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"

import { convertUTCtoLocal } from "@/app/_utils/date-helpers"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShiftQuery } from "@rkh-ms/classify-lib"
import FormField from "@/app/_components/FormField"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import useRequest from "@/app/_hooks/use-request"
import { updateShift } from "@/app/_actions/updateShift"


interface UpdateShiftProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    shift: ShiftQuery
}

interface FormFields {
    date: Date,
    startTime: string,
    endTime: string
}


/**This dialog shows a form for update the shift start and end time */
const UpdateShift: React.FC<UpdateShiftProps> = ({
    open,
    onOpenChange,
    shift
}) => {

    const {
        startTime,
        endTime,
        User: {
            firstName,
            lastName
        }
    } = shift

    // intialize the form fields
    const {
        handleSubmit,
        register,
        control,
        formState: {
            isSubmitting,
            errors
        }
    } = useForm<FormFields>({
        defaultValues: {
            date: convertUTCtoLocal(startTime).toDate(),
            startTime: convertUTCtoLocal(startTime).format('HH:mm'),
            endTime: convertUTCtoLocal(endTime!).format('HH:mm')
        }
    })

    const t = useTranslations()

    const {
        doRequest,
        resErrors
    } = useRequest({
        onSuccess: () => {
            // on success show success toast and close the dialog
            onOpenChange(false)

            //success toast
            toast.success(t('successUpdateShift'))
        }
    })

    const handleUpdate = async (values: FormFields) => {

        //format a end & start date before calling the server action
        const newDate = dayjs(values.date).format('YYYY-MM-DD')

        const nStartTime = dayjs(`${newDate} ${values.startTime}`).toISOString()
        const nEndTime = dayjs(`${newDate} ${values.endTime}`).toISOString()

        //make the request to server action to update the shift times
        await doRequest(() => updateShift(shift.id, nStartTime, nEndTime))
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="p-3">

                <DialogHeader>
                    <DialogTitle> {t('updateHours')} </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleUpdate)}
                >
                    <div className="flex flex-col gap-5 lg:gap-3 items-center">

                        <div className="w-full px-3">
                            <span>{firstName} {lastName}</span>
                        </div>

                        <div className="flex flex-col items-center gap-4 lg:w-3/5">

                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <Calendar
                                        className="w-full"
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(cDate) => cDate > new Date()}
                                        showOutsideDays={false}
                                        weekStartsOn={0}
                                    />
                                )}
                            />

                            <Separator />

                            <div className="flex gap-4">
                                <FormField
                                    label={t('startTime')}
                                    className="w-1/2"
                                    error={errors.startTime?.message || resErrors.startTime}
                                >
                                    <Input
                                        type='time'
                                        {...register('startTime', {
                                            required: t('required')
                                        })}
                                    />
                                </FormField>

                                <FormField
                                    label={t('endTime')}
                                    className="w-1/2"
                                    error={errors.endTime?.message || resErrors.endTime}
                                >
                                    <Input
                                        type='time'
                                        {...register('endTime', {
                                            required: t('required')
                                        })}
                                    />
                                </FormField>
                            </div>
                        </div>

                        <div className="flex items-center w-full lg:w-1/3">
                            <SubmitButton
                                isSubmitting={isSubmitting}
                                disabled={isSubmitting}
                            >
                                {t('update')}
                            </SubmitButton>
                        </div>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default UpdateShift