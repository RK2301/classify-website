// app/layout.tsx
import { ReactNode } from 'react';
import SessionProvider from "@/app/_context/SessionProvider";
import AppSidebar from '@/app/_components/AppSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getCurrentUser } from '@/app/_utils/getCurrentUser';

export default async function AppMainLayout({ children }: { children: ReactNode }) {
    //read the current user data from the header then pass it as a string to the 
    //session provider
    const user = await getCurrentUser()

    return (
        <SessionProvider user={user!}>
            <div className="flex lg:max-h-screen bg-[var(--color-grey-100)]">
                <SidebarProvider>

                    <div>
                        <AppSidebar />
                    </div>

                    <div className='flex-grow 
                     flex flex-col items-center
                     lg:max-h-screen overflow-auto relative'>

                        <SidebarTrigger className='fixed md:absolute top-1.5 md:top-5 start-4' />

                        <div className="grow flex flex-col items-center gap-5
                         w-11/12 md:w-4/5 md:gap-3
                         mb-6 mx-2 mt-8">
                            {children}
                        </div>

                    </div>
                </SidebarProvider>
            </div>
        </SessionProvider>
    );
}


