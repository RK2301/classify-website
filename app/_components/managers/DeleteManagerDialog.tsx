'use client';

import { MdPersonRemoveAlt1 } from "react-icons/md";


import { Button } from "@/components/ui/button";
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog";
import { useState } from "react";
import useRequest from "@/app/_hooks/use-request";
import { deleteManager } from "@/app/_actions/deleteManager";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

type DeleteManagerDialogProps = {
    /**id of the manager to be deleted */
    id: string

    /**manager name, will shown in success toast if manager removed successfully */
    name: string
}

const DeleteManagerDialog: React.FC<DeleteManagerDialogProps> = ({
    id,
    name
}) => {

    const t = useTranslations()
    const [open, setOpen] = useState<boolean>(false);
    const { doRequest } = useRequest({
        toThrowError: true
    })

    const handleAccept = () => doRequest(() => deleteManager(id))

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={'ghost'} onClick={() => setOpen(true)}>
                        <MdPersonRemoveAlt1 className="size-5" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    {t('removeAsManager')}
                </TooltipContent>
            </Tooltip>


            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={setOpen}
                message={(
                    <>
                        <span className="block">{t('removeManagerDescription.1')}</span>
                        <span className="block">{t('removeManagerDescription.2')}</span>
                    </>
                )}
                onAccept={handleAccept}
                successMsg={t('managerRemoved', { name })}
            />
        </>
    )
}

export default DeleteManagerDialog;