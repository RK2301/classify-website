'use client'

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import FormField from "@/app/_components/FormField"
import { Input } from "@/components/ui/input"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import useRequest from "@/app/_hooks/use-request"
import { AddShift } from "@/app/_actions/addSubject"
import { useSubjectDrawerState } from "@/app/_context/SubjectDrawerState"
import { UpdateSubject } from "@/app/_actions/updateSubject"
// import { useEffect } from "react"
import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams"
import { SearchParams } from "@/app/_utils/SearchParams"
import { useCallback, useEffect } from "react"

interface SubjectFormFields {
    he: string,
    ar: string,
    en: string
}

const SubjectForm = ({ subject }: { subject: Subject | undefined }) => {

    /**indicate if the form in Add or Update subject state */
    const update = !!subject

    const t = useTranslations()
    const { open, onOpenChange } = useSubjectDrawerState()
    const { deleteSearchParam } = useClassifyCustomSearchParams()

    const { doRequest, resErrors } = useRequest({
        onSuccess: () => {
            // show success message inside a toast when add or update subject success
            toast.success(update ? t('subjectUpdated') : t('subjectCreated'))

            // if the Drawer is open (mean a form opend on small screen)
            // then after success close it
            if (open)
                onOpenChange(false)

            // if it's currently update state then remove the search params
            // related to the update subject
            if (update)
                deleteSearchParam(SearchParams.SubjectId)

            // reset form state at any case
            // when add must reset the form after success
            // when update also reset as if success then must nav back to the add form
            resetFormFields()
        }
    })

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<SubjectFormFields>({
        values: subject
    })

    /**reset all form fields after success add or update */
    const resetFormFields = useCallback(() => {
        setValue('ar', '')
        setValue('he', '')
        setValue('en', '')
    }, [setValue])

    /**reset the state of the form when the subject value change
     * which mean the user choose to click to edit subject while the add form opened
     * 
     * or while open one subject to edit, chooses another one
     */
    useEffect(() => {

        // reset the state if the subject set to null 
        // so make sure it's always empty 
        if (!subject)
            resetFormFields()
        else
            reset()

    }, [subject, resetFormFields, reset])


    const onSubmit = async (values: SubjectFormFields) => {
        await doRequest(() => update ? UpdateSubject(subject.id, values) : AddShift(values))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-5 w-full">

                <FormField
                    label="עברית"
                    error={errors.he?.message || resErrors.he}
                    required
                >
                    <Input
                        {...register('he', {
                            required: t('required')
                        })}
                    />
                </FormField>

                <FormField
                    label="العربية"
                    error={errors.ar?.message || resErrors.ar}
                    required
                >
                    <Input
                        {...register('ar', {
                            required: t('required')
                        })}
                    />
                </FormField>


                <FormField
                    label="English"
                    error={errors.en?.message || resErrors.en}
                    required
                >
                    <Input
                        {...register('en', {
                            required: t('required')
                        })}
                    />
                </FormField>

                <SubmitButtonContainer className="md:basis-1/2">
                    <SubmitButton isSubmitting={isSubmitting}>
                        {update ? t('update') : t('add')}
                    </SubmitButton>
                </SubmitButtonContainer>

            </div>
        </form>
    )
}

export default SubjectForm