'use client'

import { useForm } from "react-hook-form"

import FormContainer from "@/app/_components/form_components/FormContainer"
import UserFields from "@/app/_components/form_components/UserFields"
import useRequest from "@/app/_hooks/use-request"
import { TeacherFormFields } from "@/app/_types/formsFields"
import FormSeparator from "@/app/_components/form_components/FormSeparator"
import TeacherFields from "../form_components/TeacherFields"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import SubmitButtonContainer from "../form_components/SubmitButtonContainer"
import SubmitButton from "../form_components/SubmitButton"
import { useTranslations } from "next-intl"
import { AddTeacher } from "@/app/_actions/addTeacher"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


interface AddTeacherFormProps {
    subjects: Subject[]
}

const AddTeacherForm: React.FC<AddTeacherFormProps> = ({
    subjects
}) => {

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
    } = useForm<TeacherFormFields>({
        defaultValues: {
            subjects: []
        }
    })

    const { doRequest, resErrors } = useRequest({
        onSuccess: () => {
            // show success message and redirect to teachers page
            toast.success(t('teacherAddSuccess'))

            router.push('/app/teachers')
        }
    })

    const onSubmit = async (values: TeacherFormFields) => {
        console.log(values);

        await doRequest(() => AddTeacher(values))
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FormContainer>

                <UserFields<TeacherFormFields>
                    register={register}
                    errors={errors}
                    resErrors={resErrors}
                />

                <FormSeparator />

                <TeacherFields
                    register={register}
                    errors={errors}
                    resErrors={resErrors}
                    control={control}
                    subjects={subjects}
                />

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

export default AddTeacherForm