'use client';
import { useRouter } from 'next/navigation';
import AnimatedToggleGroup, { ToggleOption } from '@/app/_components/AnimatedToggleGroup';
import { useTranslations, useLocale } from 'next-intl';

const LanguageSwitcher = () => {
    const router = useRouter();
    const t = useTranslations()
    const initLocale = useLocale()


    const languageOptions: ToggleOption[] = [
        {
            value: 'en',
            label: <span>English</span>
        },
        {
            value: 'he',
            label: <span>עברית</span>
        },
        {
            value: 'ar',
            label: <span>العربية</span>
        }
    ]

    const changeLanguage = (lang: string) => {
        document.cookie = `lang=${lang}; path=/; max-age=315360000`; // 10 years
        router.refresh()
    }

    return (
        <div className="flex items-center justify-between">
            <span className="basis-2/6">{t('language')}</span>
            <div className='basis-9/12 md:basis-7/12'>
                <AnimatedToggleGroup
                    options={languageOptions}
                    defaultValue={initLocale}
                    onChange={changeLanguage}
                />
            </div>
        </div>
    )
}

export default LanguageSwitcher;