'use client'
import { useForm } from "react-hook-form"

import { TeacherQuery } from "@rkh-ms/classify-lib"
import FormContainer from "@/app/_components/form_components/FormContainer"
import UserFields from "@/app/_components/form_components/UserFields"
import FormSeparator from "@/app/_components/form_components/FormSeparator"
import TeacherFields from "@/app/_components/form_components/TeacherFields"
import { TeacherFormFields } from "@/app/_types/formsFields"
import useRequest from "@/app/_hooks/use-request"
import SubmitButtonContainer from "../form_components/SubmitButtonContainer"
import SubmitButton from "../form_components/SubmitButton"
import { useTranslations } from "next-intl"
import { Subject } from "@rkh-ms/classify-lib/interfaces"
import { UpdateTeacher } from "@/app/_actions/updateTeacher"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


interface UpdateTeacherFormProps {
    teacher: TeacherQuery;
    subjects: Subject[]
}

const UpdateTeacherForm: React.FC<UpdateTeacherFormProps> = ({ teacher, subjects }) => {

    const router = useRouter()
    const t = useTranslations()

    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<TeacherFormFields>({
        defaultValues: {
            ...teacher.User,
            startDate: new Date(teacher.startDate),
            subjects: teacher.Subjects.map(s => String(s.id))
        }
    })

    const { resErrors, doRequest } = useRequest({
        onSuccess: () => {
            toast.success(t('teacherUpdateSuccess'))
            router.replace('/app/teachers')
        }
    })

    const onSubmit = async (values: TeacherFormFields) => {
        await doRequest(() => UpdateTeacher(values))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <FormContainer>
                <UserFields
                    register={register}
                    errors={errors}
                    resErrors={resErrors}
                    updateMode
                />

                <FormSeparator />

                <TeacherFields
                    register={register}
                    errors={errors}
                    control={control}
                    resErrors={resErrors}
                    subjects={subjects}
                />

                <SubmitButtonContainer>
                    <SubmitButton isSubmitting={isSubmitting}>
                        {t('update')}
                    </SubmitButton>
                </SubmitButtonContainer>

            </FormContainer>
        </form>
    )
}

export default UpdateTeacherForm