'use client'

import { useState } from "react"
import { MdDelete } from "react-icons/md"

import { MaterialFiles } from "@rkh-ms/classify-lib/interfaces"

import { deleteMaterialFileAction } from "@/app/_actions/deleteMaterialFileAction"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { useTranslations } from "next-intl"
import IconButton from "@/app/_components/IconButton"



interface DeleteFileProps {
    file: MaterialFiles,
    courseId: number
}

/**This component display a delete button, to delete a specific file, related to a material */
const DeleteFile: React.FC<DeleteFileProps> = ({ file, courseId }) => {

    // to control alert dialog open state
    const [open, setOpen] = useState<boolean>(false)
    const handleOpenChange = () => setOpen(open => !open)

    const t = useTranslations()

    const { doRequest } = useRequest({
        toThrowError: true
    })

    /**when user accept to delete the file, then make call to server action to delete the file */
    const handleAccept = async () => {
        await doRequest(() =>
            deleteMaterialFileAction(courseId, file.materialId, file.id))
    }

    return (
        <>
            {/**delete button */}
            <div className="w-[10%]">

                <IconButton
                    onClick={handleOpenChange}
                    variant='destructive'
                    className="p-1 hover:[&_svg]:text-inherit"
                >
                    <MdDelete className="text-[var(--color-grey-600)]" />
                </IconButton>

            </div>


            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={handleOpenChange}
                message={t('deleteFileAlert', {
                    file: file.name.length > 30 ? file.name.slice(0, 30) + '...' : file.name
                })}
                successMsg={t('deleteFileSuccess')}
                onAccept={handleAccept}
                danger
            />
        </>
    )
}

export default DeleteFile