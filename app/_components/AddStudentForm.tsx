'use client'

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


import { StudnetFormFields } from "@/app/_types/formsFields"
import { addStudentAction } from "@/app/_actions/addStudent"
import useRequest from "@/app/_hooks/use-request"
import UserFields from "@/app/_components/form_components/UserFields"
import StudentFields from "@/app/_components/form_components/StudentFields"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import FormSeparator from "@/app/_components/form_components/FormSeparator"
import { useTranslations } from "next-intl"

const AddStudentForm = () => {

    const router = useRouter()
    const t = useTranslations()

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<StudnetFormFields>()

    const { doRequest, resErrors } = useRequest({
        onSuccess: () => {
            toast.success(t('student_added_success'))

            //redirect user to the students page
            router.push('/app/students', { scroll: false })
        }
    })

    const onSubmit = (formData: StudnetFormFields) => {
        doRequest(async () => await addStudentAction(formData))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
        >
            <div
                className="flex flex-col items-center gap-3 lg:gap-6 flex-wrap"
            >
                {/**Form with fields related to add user */}
                <UserFields<StudnetFormFields>
                    register={register}
                    errors={errors}
                    resErrors={resErrors}
                />

                <FormSeparator />

                {/**Form with fields related to student, such as class or parents contacts */}
                <StudentFields
                    register={register}
                    errors={errors}
                    resErrors={resErrors}
                    control={control}
                />


                <div className="flex items-center justify-center w-full mt-6">
                    <div className="basis-full md:basis-1/4">
                        <SubmitButton
                            disabled={isSubmitting}
                            isSubmitting={isSubmitting}
                        >
                            {t('add')}
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddStudentForm