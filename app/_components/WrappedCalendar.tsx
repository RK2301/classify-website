'use client'

import { useLocale, useTranslations } from 'next-intl'
import FullCalendar from "@fullcalendar/react"
import { RefObject } from '@fullcalendar/core/preact.js'
import { useEffect, useRef, useState } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import heLocale from '@fullcalendar/core/locales/he'
import arLocale from '@fullcalendar/core/locales/ar'
import enLocale from '@fullcalendar/core/locales/en-au'
import { CalendarOptions, LocaleInput } from '@fullcalendar/core/index.js'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'


import { Language } from '@/app/_types/Language'
import useDirection from '@/app/_hooks/use-direction'
import { useIsMobile } from '@/app/_hooks/use-mobile'
import IconButton from '@/app/_components/IconButton'
import PillShapeTitle from '@/app/_components/PillShapeTitle'
import { cn } from '@/lib/utils'
import SwapIcon from './SwapIcon'


/**avaliable languages in the app and their locales from full calendar */
const availableLocales: Record<Language, LocaleInput> = {
    'ar': arLocale,
    'he': heLocale,
    'en': enLocale
}

/**This component shows Next, Today, Prev button in the calendar header toolbar */
const TodayNextPrevButtons = ({ calendarRef }: { calendarRef: RefObject<FullCalendar | null> }) => {

    const t = useTranslations()

    return (
        <div className='flex items-center gap-0.5 lg:gap-2'>
            {/**Back button */}
            <IconButton
                onClick={() => calendarRef.current?.getApi().prev()}
            >
                <SwapIcon ltrIcon={<MdArrowBackIosNew size={15} />} rtlIcon={<MdArrowForwardIos size={15} />} />
            </IconButton>

            <IconButton
                onClick={() => calendarRef.current?.getApi().today()}
                className='px-3 py-1'
            >
                {t('today')}
            </IconButton>

            {/**Next Button */}
            <IconButton
                onClick={() => calendarRef.current?.getApi().next()}
            >
                <SwapIcon ltrIcon={<MdArrowForwardIos size={15} />} rtlIcon={<MdArrowBackIosNew size={15} />} />
            </IconButton>
        </div>
    )
}


/**This component return a header pill shape to be displayed in the calendar header toolbar */
const CalendarTitle = ({ calendarTitle }: { calendarTitle: string }) => {
    return (
        <PillShapeTitle title={calendarTitle} />
    )
}


/**This component return a toggle buttons in pill shape to change current calendar view
 * 
 * between month, week, day views
 */
const CalendarViewToggleButtons = ({ calendarRef }: { calendarRef: RefObject<FullCalendar | null> }) => {

    const [currentView, setCurrentView] = useState<string>(calendarRef.current?.getApi().view.type || 'timeGridWeek')
    const t = useTranslations()

    const views = [
        { key: 'dayGridMonth', label: t('month') },
        { key: 'timeGridWeek', label: t('week') },
        { key: 'timeGridDay', label: t('day') }
    ]

    return (
        <div
            className='bg-(--color-grey-0) border border-(--color-grey-200)
            rounded-full p-1
            flex items-center gap-2 
            basis-2/3 lg:basis-1/4'
        >
            {views.map(view => {
                const active = currentView === view.key

                return (
                    <button
                        key={view.key}
                        className={cn(`bg-transparent 
                        ${active ? 'bg-(--color-grey-200) font-medium' : 'hover:bg-(--color-grey-100)'}
                        rounded-full py-1 px-2 flex-1
                        transition-all duration-300`)}

                        onClick={() => {
                            calendarRef.current?.getApi().changeView(view.key)
                            setCurrentView(view.key)
                        }}
                    >
                        {view.label}
                    </button>
                )
            })}
        </div>
    )
}


const CustomHeaderToolbar = ({
    calendarRef,
    calendarTitle
}: {
    calendarRef: RefObject<FullCalendar | null>,
    calendarTitle: string
}) => {

    const isMobileOrTablet = useIsMobile(1024)

    // if it's mobile or small table (Ipad mini or tablet in vertical mode)
    //then return the controllers at the top and under them the title
    if (isMobileOrTablet)
        return (
            <div className='flex flex-col items-center gap-2 mb-2'>

                <div className='w-full flex items-center justify-between gap-1.5'>
                    <TodayNextPrevButtons calendarRef={calendarRef} />
                    <CalendarViewToggleButtons calendarRef={calendarRef} />
                </div>

                <div>
                    <CalendarTitle calendarTitle={calendarTitle} />

                </div>
            </div>
        )

    return (
        <div className='flex justify-between items-center gap-3 w-full mb-4'>

            {/**Today and Next|Prev buttons */}
            <TodayNextPrevButtons calendarRef={calendarRef} />

            {/**Title */}
            <CalendarTitle calendarTitle={calendarTitle} />

            {/**view mode */}
            <CalendarViewToggleButtons calendarRef={calendarRef} />
        </div>
    )
}

/**This component wrapp the FullCalendar component and accept all props the calendar can accept
 * 
 * and pass it to the FullCalendar component
 * 
 * This wrapper also implement a changes to the calendar, such as:
 * 
 * * custom header toolbar
 * 
 * * custom style
 * 
 * * effects to calculate calendar height & width
 */
const WrappedCalendar: React.FC<CalendarOptions> = ({
    datesSet,
    ...props
}) => {

    const dir = useDirection()
    const lang = useLocale() as Language
    const isMobile = useIsMobile()

    const containerRef = useRef<HTMLDivElement | null>(null)
    const calendarRef = useRef<FullCalendar>(null);

    const [calendarHeight, setCalendarHeight] = useState<number | 'auto'>('auto')
    const [calendarTitle, setCalendarTitle] = useState<string>('')



    /**Set overall calendar height based on viewport heigh */
    useEffect(() => {

        const el = containerRef.current
        if (!el) return

        const setMeasuredHeight = () => {
            const rect = el.getBoundingClientRect()

            const headerAllowance = isMobile ? 120 : 100
            const available = Math.max(300, window.innerHeight - rect.top - headerAllowance);
            setCalendarHeight(available);
        }

        // immediate measure
        setMeasuredHeight()

        // watch container - viewport changes
        const ro = new ResizeObserver(() => {
            setMeasuredHeight()
        })
        ro.observe(el)

        window.addEventListener("orientationchange", setMeasuredHeight);
        window.addEventListener("resize", setMeasuredHeight);

        // clean up function
        return (() => {
            ro.disconnect()

            window.removeEventListener("orientationchange", setMeasuredHeight);
            window.removeEventListener("resize", setMeasuredHeight);
        })
    }, [isMobile])


    /**track viewport width, and update calendar width when the viewport resize */
    useEffect(() => {
        if (!containerRef.current) return;

        const ro = new ResizeObserver(() => {
            const api = calendarRef.current?.getApi();
            api?.updateSize(); // <-- forces calendar to recalc width
        });

        ro.observe(containerRef.current);

        return () => ro.disconnect();
    }, []);



    return (
        <div
            ref={containerRef}
            className="w-full"
        >
            {/**Custom header */}
            <CustomHeaderToolbar calendarRef={calendarRef} calendarTitle={calendarTitle} />


            <FullCalendar
                height={calendarHeight}
                ref={calendarRef}

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                locale={availableLocales[lang]}
                direction={dir}
                /**initial view is week view for all viewports */
                initialView="timeGridWeek"

                headerToolbar={false}

                /**first day on the calendar should be sunday */
                firstDay={0}
                dayMaxEventRows={2}

                /**for week and day views show day and week day number only
                 * for example: 7 Sun instead of 7/12 Sun
                 */
                views={{
                    timeGridWeek: {
                        dayHeaderFormat: { weekday: isMobile ? 'narrow' : 'short', day: 'numeric' }
                    },
                    timeGridDay: {
                        dayHeaderFormat: { weekday: isMobile ? 'narrow' : 'short', day: 'numeric' }
                    }
                }}
                datesSet={(info) => {
                    setCalendarTitle(info.view.title)

                    if (datesSet)
                        datesSet(info)
                }}
                {...props}
            />

        </div>
    )
}

export default WrappedCalendar