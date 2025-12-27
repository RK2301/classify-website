'use client'

import { useTranslations } from "next-intl"
import { useState } from "react"
import { MdEdit } from "react-icons/md"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { MaterialKeys } from "@rkh-ms/classify-lib/enums"

import ButtonGroup from "@/app/_components/ButtonGroup"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormContainer from "@/app/_components/form_components/FormContainer"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import useRequest from "@/app/_hooks/use-request"
import TitleDescriptionFields from "@/app/_components/courses/course_details/materials/TitleDescriptionFields"
import { updateMaterialAction } from "@/app/_actions/updateMaterialAction"


/**interface describe fields in the form */
interface FormFields {
    [MaterialKeys.TITLE]: string,
    [MaterialKeys.DESCRIPTION]?: string
}


interface UploadFilesFormProps {
    courseId: number,
    materialId: number,

    /**material title*/
    title: string,
    /**material description */
    description?: string
}


/**This component shows a dialog to update material title and/or description */
const UpdateMaterialForm: React.FC<UploadFilesFormProps> = ({
    courseId,
    materialId,
    title,
    description
}) => {

    const t = useTranslations()
    const [open, setOpen] = useState<boolean>(false)

    /** function to be called when dialog open state changed */
    const handleOpen = () => setOpen(open => !open)

    const {
        register,
        formState: {
            errors,
            isSubmitting
        },
        handleSubmit
    } = useForm<FormFields>({
        values: {
            title,
            description
        }
    })


    const { doRequest, resErrors } = useRequest({
        onSuccess: () => {
            toast.success(t('successMaterialUpdate'))

            // close the dialog
            handleOpen()
        }
    })


    /**function to handle submit the update form
        * 
        */
    const onSubmit = async (data: FormFields) => {
        console.log(data);

        // call server action to update the material
        await doRequest(() => updateMaterialAction(courseId, materialId, data))
    }

    return (
        <Dialog open={open} onOpenChange={handleOpen}>

            <DialogTrigger asChild>
                <ButtonGroup.Button>
                    <MdEdit className="size-6" />
                </ButtonGroup.Button>
            </DialogTrigger>

            <DialogContent className="lg:w-1/3">

                <DialogHeader>
                    <DialogTitle className="font-medium text-xl">
                        {t('updateMaterial')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>

                        {/**title and description fields */}
                        <TitleDescriptionFields
                            register={register}
                            resErrors={resErrors}
                            errors={errors}
                        />

                        {/**Submit Button */}
                        <SubmitButtonContainer>
                            <SubmitButton isSubmitting={isSubmitting}>
                                {t('update')}
                            </SubmitButton>
                        </SubmitButtonContainer>

                    </FormContainer>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default UpdateMaterialForm