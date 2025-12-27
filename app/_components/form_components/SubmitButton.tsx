import { Button } from "@/components/ui/button"
import { IconType } from "react-icons/lib"
import { PuffLoader } from "react-spinners"


type SubmitButtonProps = {
    /**Text to be shown inside the button */
    children: React.ReactNode

    /**Icon to show next to the label when the button not in submit mode */
    Icon?: IconType

    /**indicate whenever button should be in disabled mode */
    disabled?: boolean

    /**indeicate whenever the form that contain this submit button, is in submit mode */
    isSubmitting: boolean

    onClick?: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    children,
    Icon,
    disabled = false,
    isSubmitting,
    onClick
}) => {

    return (
        <Button
            disabled={disabled}
            className="flex items-center justify-center gap-2 [&_svg]:text-[var(--color-grey-900)]"
            onClick={onClick}
        >
            {/**if it's submit mode then show spinner
             * if not and Icon passed as prop then show it
             */}
            {isSubmitting ?
                <PuffLoader size={25} color="#f9fafb" />
                :
                Icon ? <Icon size={20}/>
                    :
                    <></>
            }
            <span>{children}</span>
        </Button>
    )
}

export default SubmitButton