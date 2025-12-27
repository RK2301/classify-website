'use client'

import { deleteMaterialAction } from "@/app/_actions/deleteMaterialAction"
import ButtonGroup from "@/app/_components/ButtonGroup"
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog"
import useRequest from "@/app/_hooks/use-request"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { MdDelete } from "react-icons/md"


interface DeleteMaterialProps {
    materialId: number,
    courseId: number
}

/**This component displays a delete button, as part of button group for each material card
 * 
 * clicking on the button will open alert dialog to ask if user if really want to delete the material
 */
const DeleteMaterial: React.FC<DeleteMaterialProps> = ({ courseId, materialId }) => {

    const t = useTranslations()

    const [open, setOpen] = useState<boolean>(false)
    const handleOpenChange = () => setOpen(open => !open)

    const { doRequest } = useRequest({
        toThrowError: true
    })

    /**when user accept to delete the material, then make request to the server action to delete it */
    const handleAccept = async () => {
        await doRequest(() => deleteMaterialAction(courseId, materialId))
    }

    return (
        <>
            <ButtonGroup.Button onClick={handleOpenChange}>
                <MdDelete className="size-6" />
            </ButtonGroup.Button>

            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={handleOpenChange}

                message={t('deleteMaterialAlert')}
                successMsg={t('deleteMaterialSuccess')}

                onAccept={handleAccept}
                danger
            />
        </>
    )
}

export default DeleteMaterial