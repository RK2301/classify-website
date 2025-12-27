'use client'

import { useTranslations } from "next-intl"
import { UserAttributes } from "@rkh-ms/classify-lib"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut
} from "@/components/ui/command"
import useRequest from "@/app/_hooks/use-request"
import { addManager } from "@/app/_actions/addManager"
import SubmitButton from "@/app/_components/form_components/SubmitButton"


type AddManagerFormProps = {
    managers: UserAttributes[],
    /**function to close the dialog after the manager added successfully */
    closeDialog: () => void
}

const AddManagerForm: React.FC<AddManagerFormProps> = ({ managers, closeDialog }) => {

    const t = useTranslations()
    const [selectedManager, setSelectedManager] = useState<string>('')
    const [isPending, startTransition] = useTransition()

    const { doRequest } = useRequest({
        onSuccess: () => {
            //show success toast when manager is added
            //and close the dialog

            //get the name of the added manager
            const addedManager = managers.find(m => m.id === selectedManager) as UserAttributes
            const name = `${addedManager.firstName} ${addedManager.lastName}`

            toast.success(t('managerAdded', { name }))

            //close the dialog
            closeDialog()
        }
    })

    const handleSelectedManager = (id: string) => {
        setSelectedManager(curId => curId === id ? '' : id)
    }

    const handleSubmit = () => {
        startTransition(() => doRequest(() => addManager(selectedManager)))
    }

    return (
        <>

            <div className="lg:flex lg:justify-center">
                <div className="lg:w-3/4">

                    <Command
                        value={selectedManager}
                    >
                        <CommandInput
                            placeholder={t('searchManagerPlaceholder')}
                        />

                        <CommandList>
                            <CommandEmpty>{t('noResults')}</CommandEmpty>

                            <CommandGroup>
                                {managers.map(m => (
                                    <CommandItem
                                        key={m.id}
                                        value={m.id}
                                        onSelect={() => {
                                            console.log(`OnSelect: ${m.id}`);
                                            handleSelectedManager(m.id);
                                        }}
                                        className={`${m.id === selectedManager ? 'data-[selected=true]:bg-[var(--color-brand-500)]' : ''}`}
                                    >
                                        <span>
                                            {m.firstName} {m.lastName}
                                        </span>

                                        {m.id === selectedManager[0] && <CommandShortcut>🤜</CommandShortcut>}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>

                    </Command>

                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <div></div>

                <div className="basis-2/5 md:basis-1/3">

                    <SubmitButton
                        disabled={!selectedManager || isPending}
                        isSubmitting={isPending}
                        onClick={handleSubmit}
                    >
                        {t('add')}
                    </SubmitButton>

                </div>
            </div>
        </>
    )
}

export default AddManagerForm;