'use client'
import { useState } from "react"
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import Chip from "@/app/_components/Chip";
import { Option } from "@/app/_types/ListOption";



type MultiSelectProps = {
    /**Display text in the combobox when no options yet selected */
    placeholder?: string
    /**text to show inside the search input placeholder
     * @default search
     */
    searchPlaceholder?: string
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void | Promise<unknown>
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    placeholder,
    searchPlaceholder,
    options,
    selected,
    onChange
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const t = useTranslations()

    const handleSelected = (value: string) => {
        let newSelected = []

        //if not included then add it to the array of values
        if (!selected.includes(value))
            newSelected = [...selected, value]
        else
            newSelected = selected.filter(c => c !== value)

        onChange(newSelected)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    className="flex justify-between items-center
                     focus-visible:ring-brand-500"
                >
                    {selected.length === 0 && 
                    <span className="text-(--color-grey-500)">
                        {
                            placeholder ?
                                placeholder :
                                'Select Options'
                        }
                    </span>}

                    {selected.length > 0 && (
                        <div
                            className="flex items-center gap-1 flex-nowrap truncate"
                            style={{ minWidth: 0 }}
                        >
                            {selected.map(c => (
                                <Chip
                                    key={c}
                                    onClick={() => {
                                        // de‑select on chip click
                                        const val = options.find((o) => o.value === c)?.value;
                                        onChange(selected.filter((v) => v !== val));
                                    }}
                                >
                                    {options.find(option => option.value === c)?.label}
                                </Chip>
                            ))}
                        </div>
                    )}
                    <HiMiniChevronUpDown className="opacity-70" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder ? searchPlaceholder : 'Search'} />

                    <CommandList>
                        <CommandEmpty>{t('noResults')}</CommandEmpty>

                        <CommandGroup>
                            {options.map((c: Option) => (
                                <CommandItem
                                    className="hover:bg-[var(--color-grey-100)]"
                                    key={c.value}
                                    onSelect={() => handleSelected(c.value)}
                                >
                                    <Checkbox checked={selected.includes(c.value)} />
                                    {c.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelect