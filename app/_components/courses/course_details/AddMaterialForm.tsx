'use client'

import { useState } from "react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { MdOutlineAdd } from "react-icons/md"
import { useForm, useWatch } from "react-hook-form"

import { MaterialKeys } from "@rkh-ms/classify-lib/enums"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormContainer from "../../form_components/FormContainer"
import SubmitButtonContainer from "../../form_components/SubmitButtonContainer"
import SubmitButton from "../../form_components/SubmitButton"
import useRequest from "@/app/_hooks/use-request"
import { addMaterialAction } from "@/app/_actions/addMaterialAction"
import TitleDescriptionFields from "./materials/TitleDescriptionFields"
import UploadFilesField from "./materials/UploadFilesField"

interface FormFields {
    [MaterialKeys.TITLE]: string,
    [MaterialKeys.DESCRIPTION]?: string,
    files: FileList
}


interface AddMaterialFormProps {
    courseId: number
}


const AddMaterialForm: React.FC<AddMaterialFormProps> = ({ courseId }) => {

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
            toast.success(t('addMaterialSuccess'))
            handleOpen()

            // reset the form
            reset()
        }
    })



    /**function to handle submit the add form
     * 
     * first check if files uploaded, less equal 7 files & no file exceed 20MB
     */
    const onSubmit = async (data: FormFields) => {
        console.log(data);

        // validate files input
        // if (!data.files || data.files.length === 0)
        //     return setError('files', { message: t('required') })


        // call server action to add the material
        await doRequest(() => addMaterialAction({
            ...data,
            courseId
        }))
    }

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger asChild>
                <Button className="h-full rounded-2xl flex flex-col gap-0 p-1.5">
                    <MdOutlineAdd className="size-7" />
                    <span className="text-[12px]"> {t('materials')} </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="lg:w-1/3">
                <DialogHeader>
                    <DialogTitle>
                        {t('addMaterial')}
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


                        {/**Uploaded files */}
                        <UploadFilesField
                            register={register}
                            errors={errors}
                            resErrors={resErrors}
                            files={files}
                        />



                        {/**Submit Button */}
                        <SubmitButtonContainer>
                            <SubmitButton isSubmitting={isSubmitting}>
                                {t('add')}
                            </SubmitButton>
                        </SubmitButtonContainer>

                    </FormContainer>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddMaterialForm