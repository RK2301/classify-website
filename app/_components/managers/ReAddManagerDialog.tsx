'use client'

import { useState } from "react";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import WrappedAlertDialog from "@/app/_components/WrappedAlertDialog";
import useRequest from "@/app/_hooks/use-request";
import { addManager } from "@/app/_actions/addManager";


type ReAddManagerDialogProps = {
    /**id of the manager to re-add */
    id: string

    /**name of the manager to be re-added, will show after success add */
    name: string
}

const ReAddManagerDialog: React.FC<ReAddManagerDialogProps> = ({ id, name }) => {

    const [open, setOpen] = useState<boolean>(false);
    const t = useTranslations()
    const { doRequest } = useRequest({
        toThrowError: true
    })

    const handleAccept = () => doRequest(() => addManager(id))


    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={'ghost'} onClick={() => setOpen(true)}>
                        <MdPersonAddAlt1 className="size-5" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    {t('restoreAsManager')}
                </TooltipContent>
            </Tooltip>

            <WrappedAlertDialog
                isOpen={open}
                setIsOpen={setOpen}
                message={(
                    <>
                        <span className="block">{t('restoreManagerDescription.1')}</span>
                        <span className="block">{t('restoreManagerDescription.2')}</span>
                    </>
                )}
                onAccept={handleAccept}
                successMsg={t('managerAdded', { name })}
            />

        </>
    )
}


export default ReAddManagerDialog