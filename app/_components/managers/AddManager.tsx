'use client'

import { useTranslations } from "next-intl"
import { UserAttributes } from "@rkh-ms/classify-lib"
import { useState, useTransition } from "react"

import { getNonManagers } from "@/app/_actions/getNonManagers"
import useRequest from "@/app/_hooks/use-request"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AddManagerForm from "@/app/_components/managers/AddManagerForm"
import DangerAlert from "@/app/_components/DangerAlert"
import ListSkeleton from "../Skeletons/listSkeleton"



const AddManager = () => {

    const t = useTranslations()
    const [open, setIsOpen] = useState<boolean>(false)
    const [managers, setManagers] = useState<UserAttributes[]>([])
    const [isPending, startTransition] = useTransition()

    const closeDialog = () => {
        setIsOpen(false)
    }

    const { doRequest } = useRequest<UserAttributes[]>({
        onSuccess: (res) => {
            //on Success, set managers to the state
            setManagers(res || [])
        }
    })

    const handleOpenChange = (isOpen: boolean) => {

        setIsOpen(isOpen)

        //call the server action to fetch the teachers that not yet managers
        if (isOpen)
            startTransition(() => doRequest(getNonManagers))
    }


    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>{t('addManager')}</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('addManager')}</DialogTitle>
                    <DialogDescription>{t('selectManagerToAdd')}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-5">

                    <div>
                        <DangerAlert
                            title={t('managerAccessTitle')}
                            description={t('managerAccessDescription')}
                        />
                    </div>

                    {/**show loading skeleton */}
                    {isPending && <ListSkeleton numberOfItems={3} />}

                    {!isPending &&
                        <AddManagerForm
                            managers={managers}
                            closeDialog={closeDialog}
                        />
                    }

                </div>
            </DialogContent>

        </Dialog>
    )
}

export default AddManager