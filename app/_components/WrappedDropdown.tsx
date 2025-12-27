'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useDirection from "@/app/_hooks/use-direction"
import { MdMoreVert } from "react-icons/md"
import { useState } from "react"
import { IconType } from "react-icons/lib"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface WrappedDropdownProp {
    /**indicate when the dropdown trigger must still have opened style
     * 
     * e.g. when dropdown have a option to open Popover in place the dropdown,
     * 
     * so still have to show open style for the trigger
     */
    stillOpen?: boolean,
    children: React.ReactNode
}


/**This component wrap the DropMenu component and add basic functionality
 * 
 * e.g. direction of the dropdown, styling, handle style for the trigger
 * 
 * This componnet must pass a DropdownMenuItem 's as children, no need DropdownMenuContent as it's included inside it
 */
const WrappedDropdown = ({
    stillOpen,
    children
}: WrappedDropdownProp) => {

    const [open, setOpen] = useState<boolean>(false)
    const dir = useDirection()

    return (
        <DropdownMenu
            dir={dir}
            open={open}
            onOpenChange={setOpen}
        >

            <DropdownMenuTrigger asChild>
                <MdMoreVert
                    className={cn(`cursor-pointer text-[var(--color-grey-600)] ${stillOpen || open ? 'text-[var(--color-grey-400)]' : ''}`)}
                    size={20}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {children}
                </DropdownMenuGroup>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}



interface WrappedDropdownMenuItemProps {
    Icon?: IconType,
    label: string,
    className?: string,
    onClick?: () => void,

    /**indicate a danger option such as delete
     * 
     * item will have style with red colors indicate danger option
     */
    danger?: boolean,

    /**if the item is a link to other page, pass the link and item will render as a Link */
    link?: string,
    disabled?: boolean
}

/** This component wrap DropdownMenuItem whick make it more simple to add icon, label
 * 
 * and a danger option (showing it in red colors)
 * 
 * if link pass then must be a path to page in the app so the item will rendered as Link
*/
export const WrappedDropdownMenuItem: React.FC<WrappedDropdownMenuItemProps> = ({
    Icon,
    label,
    className,
    onClick,
    link,
    danger = false,
    disabled = false
}) => {

    const Item =
        <DropdownMenuItem
            onClick={onClick}
            className={cn(className, danger ? 'text-red-400 focus:bg-red-500' : '')}
            disabled={disabled}
        >
            {Icon && <Icon />}
            <span>{label}</span>
        </DropdownMenuItem>

    if (link)
        return (
            <Link href={link}>
                {Item}
            </Link>
        )

    return Item
}

export default WrappedDropdown