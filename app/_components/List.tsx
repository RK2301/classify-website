import { cn } from "@/lib/utils"
import Link from "next/link"

const List = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <ul
            className="list-none w-full"
        >
            {children}
        </ul>
    )
}

/**item to render inside the list
 * 
 * when item marked as link (to be used as button link),
 * 
 * the item will have div container with padding set to 2 and justify between
 */
const ListItem = ({
    children,
    className,
    link = false,
    href,
    selected = false,
    onClick
}: {
    children: React.ReactNode,
    className?: string,
    /**indicate if the item in the list is render as link */
    link?: boolean,
    /**where to nav when item clicked, required if items marked as link */
    href?: string,

    /**indicate if the current item selected
     * 
     * selecting an item will give it a different background color and border radius
     */
    selected?: boolean,
    onClick?: () => void
}) => {
    return (
        <li
            className={cn(
                "border border-transparent",
                `
                    ${link ? `hover:bg-[var(--color-grey-50)]
                         active:hover:bg-[var(--color-grey-50)] transform active:scale-[0.98]`
                    : 'p-4'}`,
                `transition-all duration-300 ease-in-out`,
                `bg-[var(--color-grey-0)]`,
                `rounded-sm first:rounded-t-2xl mb-0.5 last:mb-0 last:rounded-b-2xl`,
                selected && [
                    "border-[var(--color-brand-500)]",
                    // We use an arbitrary value for opacity here since your CSS vars might not support tailwind opacity syntax directly without config
                    // If tailwind opacity works for you, use bg-brand-500/10. If not, use this color-mix:
                    "bg-[color-mix(in_srgb,var(--color-brand-500),transparent_85%)]",
                    "shadow-[0_0_15px_-3px_rgba(63,114,175,0.15)]", // Subtle brand glow
                    "[li:not(:first-child):not(:last-child)]:rounded-full"
                ],

                //  'bg-brand-300 dark:bg-brand-600 ',
                className)}
            onClick={onClick}
        >
            {link &&
                <Link className="" href={href || '/app'}>
                    <div className='flex items-center justify-between gap-2 p-3 '>
                        {children}
                    </div>
                </Link>}
            {!link && children}
        </li>
    )
}

List.ListItem = ListItem
export default List