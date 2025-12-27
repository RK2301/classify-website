'use client'

import { useState } from "react"
import { CheckIcon } from "lucide-react"
import { HiMiniChevronUpDown } from "react-icons/hi2"

import { useIsMobile } from "@/app/_hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Option } from "@/app/_types/ListOption";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useTranslations } from "next-intl"
import ListSkeleton from "./Skeletons/listSkeleton"

type WrappedSelectProps = {
    options: Option[]
    defaultValue?: string

    /**a function to be called when open state for the list change.
     * 
     * good to perform such a fetch data when the list opend
     * 
     * the function called and receives the new state of the list, open or closed
     */
    openStateChange?: (open: boolean) => void | Promise<void>

    /**indicate if options to be displayed in the list beign fetching right now */
    isOptionsLoading?: boolean

    /**function called with the new value. and pass the new value as a argument to the function */
    onValueChange?: (value: string) => void

    /**Text to show inside the trigger when no value selected
     * 
     * e.g. Select Teacher
     */
    triggerPlaceholder?: string

    /**Placeholder to show inside the input to search for items in the list
     * 
     * e.g. search for a teacher
     */
    searchPlaceholder?: string
}

/**This component wrap the Select component with support of Command component to add the ability to search item to select
 * 
 * in addition to that the list will appear in Drawer when the user uses phone, where's in the desktop uses Popover
 */
const WrappedSelect: React.FC<WrappedSelectProps> = ({
    options,
    defaultValue,
    onValueChange,
    triggerPlaceholder,
    searchPlaceholder,
    openStateChange,
    isOptionsLoading
}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string | undefined>(defaultValue)

    //show Drawer component instead of Popover when user uses mobile
    const isMobile = useIsMobile()

    const onOpenChange = (open: boolean) => {

        // first if the user pass a fucntion to perform a operation when 
        // the open state changes, then call it and pass the new value
        openStateChange?.(open)

        setOpen(open)
    }

    const handleOnSelect = (newValue: string) => {

        // if click the current selected item then deSelect it
        const valueToSet = newValue === value ? '' : newValue

        setValue(valueToSet)
        onValueChange?.(valueToSet)

        //close the popover or the drawer
        setOpen(false)
    }

    const ListProps: SelectListProps = {
        options,
        selectedValue: value,
        handleOnSelect,
        searchPlaceholder,
        isOptionsLoading
    }

    if (isMobile)
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTrigger asChild>
                    <Button
                        variant='outline'
                        className="justify-between items-center"
                    >
                        {value ? options.find(option => option.value === value)?.label : 
                        <span className="text-(--color-grey-500)">{triggerPlaceholder}</span>}

                        <HiMiniChevronUpDown className="opacity-70" />
                    </Button>
                </DrawerTrigger>

                <DrawerContent>
                    <SelectList {...ListProps} />
                </DrawerContent>
            </Drawer>
        )

    return (
        <Popover open={open} onOpenChange={onOpenChange} modal>

            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className="justify-between items-center"
                >
                    {value ? options.find(option => option.value === value)?.label : triggerPlaceholder}

                    <HiMiniChevronUpDown />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-2">
                <SelectList {...ListProps} />
            </PopoverContent>

        </Popover>
    )
}




interface SelectListProps {
    options: WrappedSelectProps['options']

    /**The function to be called when user select new value */
    handleOnSelect: (newValue: string) => void

    /**the currently selected value
     * 
     * which come from value state variable
     */
    selectedValue?: string

    searchPlaceholder?: WrappedSelectProps['searchPlaceholder']

    /**show Skeleton when options begin fetched */
    isOptionsLoading?: WrappedSelectProps['isOptionsLoading']
}


/**This component shows the list items inside the Popover or Drawer */
const SelectList: React.FC<SelectListProps> = ({
    options,
    handleOnSelect,
    selectedValue,
    searchPlaceholder,
    isOptionsLoading
}) => {

    //for mobile user make Command List have more Height
    const isMobile = useIsMobile()

    const t = useTranslations()

    if (isOptionsLoading)
        return (
            <ListSkeleton className="px-2 py-1" />
        )

    return (
        <Command>
            <CommandInput placeholder={searchPlaceholder || 'Search'} />

            <CommandList className={isMobile ? "max-h-[60vh]" : "max-h-[30vh]"}>
                <CommandEmpty>{t('noResults')}</CommandEmpty>

                <CommandGroup>
                    {options.map(option => (
                        <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() => handleOnSelect(option.value)}
                        >
                            <CheckIcon
                                className={cn('h-3 w-3', option.value === selectedValue ? 'opacity-100' : 'opacity-0')}
                            />
                            {option.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>

        </Command>
    )
}

export default WrappedSelect