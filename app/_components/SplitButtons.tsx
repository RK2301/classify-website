'use client'

import { IconType } from "react-icons/lib"


type ButtonProps = {
    danger?: boolean
    children: React.ReactNode
    Icon?: IconType
    onClick?: () => Promise<unknown> | unknown
}

export const Button: React.FC<ButtonProps> = ({
    danger = false,
    children,
    Icon,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[var(--color-grey-0)] p-4 w-full
                             flex items-center justify-center gap-2
                             first:rounded-s-md first:rounded-e-none
                             last:rounded-s-none last:rounded-e-md
                             transition-colors duration-300
                             ${danger ? 'hover:bg-red-600' : 'hover:bg-[var(--color-grey-200)]'}`}
        >
            {Icon && <Icon size={20} />}
            {children}
        </button>
    )
}

type SplitButtonsComponentProps = React.FC<{
    children: React.ReactElement<ButtonProps>[]
}>
    & {
        Button: typeof Button
    }

/**This component shows 2 buttons next to each.
 * each button takes 50% of the space
 */
const SplitButtons: SplitButtonsComponentProps = ({
    children
}) => {

    return (
        <div
            className='grid grid-cols-2 w-full gap-1'
        >
            {children}
        </div>
    )
}

SplitButtons.Button = Button
export default SplitButtons