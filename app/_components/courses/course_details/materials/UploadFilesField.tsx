import { useTranslations } from "next-intl"
import { FieldErrors, Path, UseFormRegister } from "react-hook-form"

import FormRow from "@/app/_components/form_components/FormRow"
import { Input } from "@/components/ui/input"
import FormField from "@/app/_components/FormField"
import List from "@/app/_components/List"



/**maximum number of files user allowed to upload when add amaterial */
const MAX_FILES = 7

/**maximum size allowed for a file to be uploaded */
const MAX_FILE_SIZE = 10 * 1024 * 1024

/**maximum size for all the files to be uploaded */
const MAX_TOTAL = 20 * 1024 * 1024


/**Add or upload material forms should have upload files input */
interface MaterialFileForm {
    files: FileList
}

type UploadFilesFieldProps<T extends MaterialFileForm> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>,
    resErrors: Record<string, string>,
    /**The files that uploaded */
    files: FileList
}


/**This component dispalys a input to upload files for course material
 * 
 * also validate that files:
 * 1. not more than 7.
 * 
 * 2. no file larger than 10MB
 * 
 * 3. overall files size not exceeds 20MB
 * 
 * can be used when want to add new material, or upload more files for existing one
 */
const UploadFilesField = <T extends MaterialFileForm = MaterialFileForm>({
    register,
    errors,
    resErrors,
    files
}: UploadFilesFieldProps<T>) => {

    const t = useTranslations()


    return (
        <>

            {/**Upload file|s */}
            <FormRow cols={1}>

                <div className="flex flex-col gap-1 w-full">
                    <FormField
                        label={t('uploadFiles')}
                        error={errors.files?.message as string | undefined || resErrors.files}
                        required
                    >
                        <Input
                            id={'files'}
                            type='file'
                            multiple
                            {...register('files' as Path<T>, {
                                required: t('required'),
                                validate: {
                                    maxFiles: (files) => files.length <= MAX_FILES || t('maxNumberOfFiles', { max: MAX_FILES }),

                                    exceedFileSize: (files) => {

                                        // check if file size more than 10mb
                                        const exceedFile = (Array.from(files)
                                            .filter(file => file.size > MAX_FILE_SIZE)[0]) as File | undefined

                                        if (exceedFile)
                                            return t('fileSizeExceeded', {
                                                file: exceedFile.name.length > 20 ?
                                                    exceedFile.name.slice(0, 21) + '...' : exceedFile.name,
                                                size: MAX_FILE_SIZE / 1024 / 1024
                                            })

                                        // pass validation
                                        return true
                                    },

                                    // check if overall files sizes more than 20mb
                                    // if yes then set an error
                                    totalFilesSize: (files) => {
                                        const overallSize = Array.from(files).reduce((acc, currFile) => acc + currFile.size, 0)
                                        if (overallSize > MAX_TOTAL)
                                            return t('maxUploadSize', { total: MAX_TOTAL / 1024 / 1024 })

                                        // pass validation
                                        return true

                                    }
                                }
                            })}
                        />
                    </FormField>


                    {/**list of notes for uploading files.
                        * e.g. max of 7 files, and maximum of 20MB
                    */}
                    <div className="flex flex-col gap-1 text-[var(--color-grey-500)]">
                        <span className="font-medium">
                            {t('maxNumberOfFiles', { max: MAX_FILES })}
                        </span>

                        <span className="font-medium">
                            {t('maxFileSize', { size: MAX_FILE_SIZE / 1024 / 1024 })}
                        </span>

                        <span className="font-medium">
                            {t('maxUploadSize', { total: MAX_TOTAL / 1024 / 1024 })}
                        </span>
                    </div>
                </div>

            </FormRow>


            {/**show names of the uploaded files */}
            <div className="w-full lg:w-4/5">
                <List>
                    {files?.length > 0 && Array.from(files).map((file, index) => {

                        const nameSplitted = file?.name.split('.')
                        const fileType = nameSplitted![nameSplitted!.length - 1]
                        const fileName = nameSplitted?.slice(0, nameSplitted!.length - 1).join('.')

                        return (
                            <List.ListItem
                                key={index}
                                className="bg-[var(--color-grey-100)] text-center"
                            >
                                {
                                    file!.name.length > 24 ?
                                        fileName!.slice(0, 15) + '...' + fileName!.substring(fileName!.length - 8, fileName!.length) + `.${fileType}`
                                        : file!.name.length
                                }
                            </List.ListItem>
                        )
                    })}
                </List>
            </div>
        </>
    )
}

export default UploadFilesField