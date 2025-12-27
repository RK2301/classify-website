'use client'

import { StudentQuery } from "@rkh-ms/classify-lib"
import { useForm } from "react-hook-form"

import { StudnetFormFields } from "@/app/_types/formsFields"
import UserFields from "@/app/_components/form_components/UserFields"
import useRequest from "@/app/_hooks/use-request"
import FormSeparator from "@/app/_components/form_components/FormSeparator"
import StudentFields from "@/app/_components/form_components/StudentFields"
import FormContainer from "@/app/_components/form_components/FormContainer"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import { updateStudnet } from "../_actions/updateStudent"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

type UpdateStudnetFormProps = {
    student: StudentQuery
}

const UpdateStudnetForm: React.FC<UpdateStudnetFormProps> = ({
    student
}) => {

    const router = useRouter()
    const t = useTranslations()

    const {
        handleSubmit,
        register,
        control,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<StudnetFormFields>({
        defaultValues: {
            ...student.User,
            grade: student.grade,
            motherName: student.motherName,
            motherPhone: student.motherPhone,
            fatherName: student.fatherName,
            fatherPhone: student.fatherPhone
        }
    })

    const { doRequest, resErrors } = useRequest({
        onSuccess: () => {
            //show success toast and redirect to /app/students
            toast.success(t('edit_success'))

            router.push('/app/students')
        }
    })

    const onSubmit = (formData: StudnetFormFields) => {
        //make put request to update the studnet data
        doRequest(async () => await updateStudnet(formData))
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
        >
            <FormContainer>

                <UserFields<StudnetFormFields>
                    errors={errors}
                    register={register}
                    resErrors={resErrors}
                    updateMode
                />

                <FormSeparator />

                <StudentFields
                    register={register}
                    errors={errors}
                    resErrors={resErrors}
                    control={control}
                />

                <SubmitButtonContainer>
                    <SubmitButton
                        disabled={isSubmitting}
                        isSubmitting={isSubmitting}
                    >
                        {t('edit')}
                    </SubmitButton>
                </SubmitButtonContainer>

            </FormContainer>
        </form>
    )
}

export default UpdateStudnetForm