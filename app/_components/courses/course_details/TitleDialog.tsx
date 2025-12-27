'use client'

import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"

import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { usePermission } from "@/app/_hooks/use-permission"
import FormContainer from "@/app/_components/form_components/FormContainer"
import FormRow from "@/app/_components/form_components/FormRow"
import FormField from "@/app/_components/FormField"
import { Input } from "@/components/ui/input"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import useRequest from "@/app/_hooks/use-request"
import { updateCourseTitleAction } from "@/app/_actions/updateCourseTitle"
import { toast } from "sonner"
import { useState } from "react"


interface TitleDialogProps {
    /**id of course to display it's title */
    courseId: number

    /**title of the course, that must be displayed */
    title: string
}


interface FormFields {
    title: string
}

/**This dialog shows a course title
 * 
 * for a manager, will show update field, so manager can update the title if needed
 */
const TitleDialog: React.FC<TitleDialogProps> = ({ courseId, title }) => {


    const [open, setOpen] = useState<boolean>(false)

    /**Whenever the user have permission to update the course
     * 
     * in this case, if can update the title
     */
    const canUpdate = usePermission(Actions.updateAny, Resources.Course)
    const t = useTranslations()

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
            errors
        }
    } = useForm<FormFields>({ defaultValues: { title } })

    const { doRequest } = useRequest({
        onSuccess: () => {
            toast.success(t('courseUpdateTitleSuccess'))
            setOpen(open => !open)
        }
    })


    /**when submit the form make a request to update the title */
    const onSubmit = async (data: FormFields) => {
        console.log(data);

        await doRequest(() => updateCourseTitleAction({
            courseId,
            title: data.title
        }))

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>

                <div className="bg-[var(--color-grey-0)]
                    border border-[var(--color-grey-200)]
                    shadow-sm
                    rounded-full px-3 py-1.5
                    max-w-3/5
                    truncate
                    cursor-pointer
                    ">
                    {title}
                </div>

            </DialogTrigger>

            <DialogContent className="lg:w-1/3">

                {canUpdate && (
                    <form
                        className="pt-1.5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormContainer>

                            <FormRow cols={1}>
                                <FormField
                                    error={errors.title?.message}
                                    required
                                >
                                    <Input
                                        id="title"
                                        {...register('title', {
                                            required: t('required')
                                        })}
                                    />
                                </FormField>
                            </FormRow>

                            <SubmitButtonContainer>
                                <SubmitButton
                                    isSubmitting={isSubmitting}
                                >
                                    {t('update')}
                                </SubmitButton>
                            </SubmitButtonContainer>
                        </FormContainer>
                    </form>
                )}

                {
                    !canUpdate &&
                    <div className="flex justify-center">
                        <span>{title}</span>
                    </div>
                }

            </DialogContent>
        </Dialog>
    )
}

export default TitleDialog