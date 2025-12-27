'use client'
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";

const WrappedSidebarHeader = () => {
    const {
        open,
        isMobile
    } = useSidebar()

    return (
        <SidebarHeader>
            <img
                src={"/logo.png"}
                alt="Logo"
                className={`w-3/4 h-auto mx-auto my-4 ${!open && !isMobile ? 'opacity-0' : ''}`}
            />
        </SidebarHeader>
    )
}

export default WrappedSidebarHeader;