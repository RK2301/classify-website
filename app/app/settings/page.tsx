import { getTranslations } from 'next-intl/server'
import { FaUserTie } from 'react-icons/fa'
import { MdLibraryBooks } from 'react-icons/md'

import { Actions, Resources } from '@rkh-ms/classify-lib/accesscontrol'

import Restricted from '@/app/_components/access_control/Restricted'
import LanguageSwitcher from '@/app/_components/LanguageSwitcher'
import List from '@/app/_components/List'
import SettingsFooter from '@/app/_components/SettingsFooter'
import ThemeSwitcher from '@/app/_components/ThemeSwitcher'
import { getCurrentUser } from '@/app/_utils/getCurrentUser'
import Avatar from '@/app/_components/Avatar'



export const metadata = {
    title: 'Settings'
}



const SettingsPage = async () => {

    const t = await getTranslations()
    const session = await getCurrentUser()

    const links = [
        {
            title: t('managers'),
            url: `/app/managers`,
            icon: FaUserTie,
            subtitle: t('addOrRemoveManagers')
        }, {
            title: t('subjects'),
            url: "/app/subjects",
            icon: MdLibraryBooks
        }]

    return (
        <div
            className="flex justify-center items-center w-full"
        >
            <div className="w-11/12 md:w-6/12
            flex flex-col justify-center items-center gap-6">
                <List>
                    <List.ListItem className='py-2'>
                        <ThemeSwitcher />
                    </List.ListItem>

                    <List.ListItem className='py-2'>
                        <LanguageSwitcher />
                    </List.ListItem>
                </List>

                {/**for manager only show a 2 buttons to nav for manager & subjects pages */}
                <Restricted
                    action={Actions.readAny}
                    resource={Resources.Manager}
                >
                    <List>
                        {links.map(link => (
                            <List.ListItem
                                key={link.title}
                                link
                                href={link.url}
                            >
                                <div className='flex gap-2 items-center'>
                                    <link.icon style={{ height: '18px', width: 'auto' }} />
                                    <span className='text-lg'>{link.title}</span>
                                </div>

                                {link.subtitle && <span className='text-sm text-gray-500 dark:text-gray-400'>{link.subtitle}</span>}
                            </List.ListItem>
                        ))}
                    </List>
                </Restricted>

                <List>
                    <List.ListItem>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <Avatar
                                firstName={session?.firstName || ''}
                                lastName={session?.lastName || ''}
                                size='xl'
                            />

                            {/**Show user name + mail */}
                            <div className='flex flex-col items-center justify-center gap-0.5'>
                                <span className='font-bold text-xl'>
                                    {session?.firstName}
                                    {' '}
                                    {session?.lastName}
                                </span>

                                <span className='text-gray-500  dark:text-gray-400'>
                                    {session?.email}
                                </span>
                            </div>
                        </div>
                    </List.ListItem>
                </List>

                <SettingsFooter />
            </div>
        </div>
    )
}

export default SettingsPage


{/* <div
                    className='grid grid-cols-2 w-full gap-1'>
                    <button
                        className='bg-[var(--color-grey-0)] p-4
                     flex items-center justify-center gap-2
                     rounded-s-md
                     rounded-e-none
                    hover:bg-red-600'
                    // style={{
                    //     borderStartEndRadius: '0px',
                    //     borderEndEndRadius: '0px'
                    // }}
                    >
                        <HiArrowRightStartOnRectangle size={20} />
                        Logout
                    </button>
                    <button className='bg-[var(--color-grey-0)] p-4
                    flex items-center justify-center gap-2
                    rounded-s-none
                    rounded-e-md
                    hover:bg-gray-700'
                    // style={{
                    //     borderStartStartRadius: '0px',
                    //     borderEndStartRadius: '0px'
                    // }}
                    >
                        <MdLockReset size={20} />
                        Reset Password
                    </button>
                </div> */}