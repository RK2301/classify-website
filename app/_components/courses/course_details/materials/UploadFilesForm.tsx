'use client'

import { useTranslations } from "next-intl"
import { useState } from "react"
import { MdUpload } from "react-icons/md"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import ButtonGroup from "@/app/_components/ButtonGroup"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormContainer from "@/app/_components/form_components/FormContainer"
import SubmitButtonContainer from "@/app/_components/form_components/SubmitButtonContainer"
import SubmitButton from "@/app/_components/form_components/SubmitButton"
import UploadFilesField from "@/app/_components/courses/course_details/materials/UploadFilesField"
import useRequest from "@/app/_hooks/use-request"
import { uploadMaterialFilesAction } from "@/app/_actions/uploadMaterialFilesAction"


/**interface describe fields in the form */
interface FormFields {
    files: FileList
}


interface UploadFilesFormProps {
    courseId: number,
    materialId: number,

    /**material title, to which more files want to be uploaded */
    title: string
}


/**This component shows a dialog to upload more files for a given material */
const UploadFilesForm: React.FC<UploadFilesFormProps> = ({
    courseId,
    materialId,
    title
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
        handleSubmit,
        reset,
        control
    } = useForm<FormFields>()

    // watch files uploaded
    const files = useWatch({ control, name: 'files' })


    const { doRequest, resErrors } = useRequest({
        onSuccess: () => {
            toast.success(t('filesUploadSuccess'))
            handleOpen()

            // reset the form
            reset()
        }
    })


    /**function to handle submit the add form
        * 
        */
    const onSubmit = async (data: FormFields) => {
        console.log(data);

        // call server action to add the material
        await doRequest(() => uploadMaterialFilesAction(courseId, materialId, data.files))
    }

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger asChild>

                <ButtonGroup.Button>
                    <MdUpload className="size-6" />
                </ButtonGroup.Button>

            </DialogTrigger>

            <DialogContent className="lg:w-1/3">

                <DialogHeader>
                    <DialogTitle className="font-medium text-xl">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>

                        {/**upload files field */}
                        <UploadFilesField
                            register={register}
                            errors={errors}
                            resErrors={resErrors}
                            files={files}
                        />

                        {/**Submit Button */}
                        <SubmitButtonContainer>
                            <SubmitButton isSubmitting={isSubmitting}>
                                {t('uploadFiles')}
                            </SubmitButton>
                        </SubmitButtonContainer>

                    </FormContainer>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default UploadFilesForm