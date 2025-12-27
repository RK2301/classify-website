import { MdError } from "react-icons/md";
import { toast } from "sonner";
import DismissButton from "@/app/_components/DismissButton";

export function wrappedErrorToast(error: string) {
    toast.error(error, {
        icon: <MdError size={25} />,
        style: {
            backgroundColor: 'var(--color-red-500)',
            borderColor: 'var(--color-red-500)',
            color: 'var(--color-grey-100)',
            boxShadow: 'var(--shadow-sm)',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            paddingLeft: '0.7rem',
            paddingRight: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        },
        duration: 7000,
        cancel: <DismissButton />
    });

    // toast((
    //     <div className="flex items-center h-full w-full bg-amber-300">

    //         <div className="flex gap-2 items-start">
    //             <MdError size={20} />
    //             <span >{` ${error}`}</span>
    //         </div>
    //     </div>

    // ), {
    //     style: {
    //         backgroundColor: 'var(--color-red-500)',
    //         borderColor: 'var(--color-red-500)',
    //         color: 'var(--color-grey-100)',
    //         boxShadow: 'var(--shadow-sm)',
    //         paddingTop: '0.5rem',
    //         paddingBottom: '0.5rem',
    //         paddingLeft: '0.7rem',
    //         paddingRight: '0.7rem',
    //         display: 'flex',
    //         alignItems: 'start'
    //     },
    //     duration: 7000,
    //     cancel: <DismissButton />
    // })
}