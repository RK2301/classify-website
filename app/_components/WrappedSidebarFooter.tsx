import { SidebarFooter, SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import UserAvatar from "@/app/_components/UserAvatar";


const WrappedSidebarFooter = () => {
    const { setOpenMobile, isMobile } = useSidebar()

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem
                    onClick={() => {
                        if (isMobile)
                            setOpenMobile(false)
                    }}
                >
                    <UserAvatar />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default WrappedSidebarFooter;