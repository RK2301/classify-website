'use client'
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";
import Restricted from "./access_control/Restricted";

type SidebarHeaderProps = {
    item: {
        title: string;
        url: string;
        icon: IconType;
        exact?: boolean;
        restricted?: {
            action: Actions | Actions[],
            resource: Resources
        }
    }
}

const WrappedSidebarMenuItem: React.FC<SidebarHeaderProps> = ({ item }) => {
    const pathname = usePathname()
    const {setOpenMobile, isMobile} = useSidebar()

    const Render = (
    <SidebarMenuItem>
        <SidebarMenuButton
            asChild
            tooltip={item.title}
            className="text-[var(--color-grey-600)] hover:bg-[var(--color-grey-100)]"
            isActive={item.exact ? pathname === item.url : pathname.includes(item.url)}
            // when button click & sidebar is opened in mobile -> close it
            onClick={() => {
                if(isMobile)
                    setOpenMobile(false)
            }}
        >
            <Link href={item.url}>
                <item.icon style={{ height: '22px', width: 'auto' }} />
                <span className="text-lg ">{item.title}</span>
            </Link>
        </SidebarMenuButton>
    </SidebarMenuItem>)

    return (
        <>
            {item.restricted ?
                <Restricted
                    action={item.restricted.action}
                    resource={item.restricted.resource}
                >
                    {Render}
                </Restricted>
                : Render
            }
        </>
    )
}

export default WrappedSidebarMenuItem;