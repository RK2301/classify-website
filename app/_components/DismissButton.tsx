import { toast } from "sonner"
import { HiOutlineXMark } from "react-icons/hi2";
import IconButton from "@/app/_components/IconButton";


const DismissButton = ({ }) => {
    return (
        <IconButton
            onClick={() => { toast.dismiss() }}
            variant='ghost'
        >
            <HiOutlineXMark size={20} />
        </IconButton>
    )
}

export default DismissButton