'use client'

import { useTranslations } from "next-intl";
import { MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher, FaUserGraduate, FaClock } from "react-icons/fa";
import { LucideBookOpen } from "lucide-react";

import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu
} from "@/components/ui/sidebar"
import WrappedSidebarHeader from "@/app/_components/WrappedSidebarHeader";
import WrappedSidebarMenuItem from "@/app/_components/WrappedSidebarMenuItem";
import WrappedSidebarFooter from "@/app/_components/WrappedSidebarFooter";
import useDirection from "@/app/_hooks/use-direction";



export default function AppSidebar() {
    const t = useTranslations()
    const dir = useDirection() === 'ltr' ? 'left' : 'right'


    // Menu items.
    const items = [
        {
            title: t('dashboard'),
            url: "/app",
            icon: MdDashboard,
            exact: true
        },
        {
            title: t('teachers'),
            url: "/app/teachers",
            icon: FaChalkboardTeacher,
            restricted: {
                action: Actions.readAny,
                resource: Resources.Teacher
            }
        },
        {
            title: t('students'),
            url: "/app/students",
            icon: FaUserGraduate,
            restricted: {
                action: Actions.readAny,
                resource: Resources.Student
            }
        },
        {
            title: t("courses"),
            url: "/app/courses",
            icon: LucideBookOpen,
        },
        {
            title: t("shifts"),
            url: "/app/shifts",
            icon: FaClock,
            restricted: {
                action: [Actions.readAny, Actions.readOwn],
                resource: Resources.Teacher
            }
        },
    ]

    return (
        <Sidebar collapsible='icon' side={dir}>
            <WrappedSidebarHeader />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent >
                        <SidebarMenu className="gap-3">
                            {items.map((item) => <WrappedSidebarMenuItem key={item.title} item={item} />)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <WrappedSidebarFooter />
        </Sidebar>
    )
}