'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdMoreVert } from "react-icons/md";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useSession } from "@/app/_context/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



const UserAvatar = () => {
    const { session: user } = useSession()
    const pathname = usePathname()

    return (
        <SidebarMenuButton
            asChild
            className="text-[var(--color-grey-600)] hover:bg-[var(--color-grey-100)]"
            isActive={pathname.includes('/app/settings')}
        >
            <Link
                href='/app/settings'
            >
                <Avatar
                    className="h-8 w-8 rounded-lg grayscale"
                >
                    <AvatarImage src={'/avatar.png'} alt={'avatar'} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-medium">{user?.firstName + ' ' + user?.lastName}</span>
                    <span className="text-muted-foreground truncate text-xs">
                        {user?.email}
                    </span>
                </div>
                <MdMoreVert size={25} className="ms-auto" />
            </Link>
        </SidebarMenuButton>
    )
}

{/* <div>
                <HiArrowRightStartOnRectangle style={{ height: '22px', width: 'auto' }} />
                <span className="text-lg ">Logout</span>
            </div> */}
export default UserAvatar;