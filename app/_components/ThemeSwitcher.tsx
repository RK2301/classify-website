'use client'
import AnimatedToggleGroup, { ToggleOption } from "@/app/_components/AnimatedToggleGroup"
import { useTranslations } from "next-intl";
import { MdOutlineWbSunny, MdOutlineBrightness2, MdMonitor } from "react-icons/md";
import { Theme, useTheme } from "@/app/_context/ThemeProvider";



const ThemeSwitcher = () => {
    const t = useTranslations()
    const { theme, setNewTheme } = useTheme()

    const themeOptions: ToggleOption[] = [
        {
            value: 'light',
            label: <div className="flex items-center gap-1 justify-center">
                <MdOutlineWbSunny size={17} /> {t('light')}
            </div>
        },
        {
            value: 'dark',
            label: <div className="flex items-center gap-1 justify-center">
                <MdOutlineBrightness2 size={17} /> {t('dark')}
            </div>
        },
        {
            value: 'system',
            label: <div className="flex items-center gap-1 justify-center">
                <MdMonitor size={17} /> {t('system')}
            </div>
        }
    ];





    return (
        <div className="flex items-center justify-between">
            <span className="basis-2/6">{t('theme')}</span>
            <div className='basis-9/12 md:basis-7/12'>
                <AnimatedToggleGroup
                    options={themeOptions}
                    defaultValue={theme}
                    onChange={(newTheme: string) => setNewTheme(newTheme as Theme)}
                />
            </div>

        </div>
    )
}

export default ThemeSwitcher