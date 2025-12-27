'use client'

import { useLocale } from "next-intl";
import { MdArrowBackIos, MdArrowForwardIos, MdCalendarMonth } from "react-icons/md";
import { useEffect, useMemo, useRef, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/app/_hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useDirection from "@/app/_hooks/use-direction";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";


interface MonthYearPickerProps {
    /**represent the default month to be selected 
     * 
     * if not passed then will set to the current month
     * 
     * value must be  0 - 11 
    */
    defaultMonth?: number

    /**represent the default year to be selected
     * 
     * if not passed then will set to the current year
     */
    defaultYear?: number

    /**function to be called when user select new month (it will be passed to the function) */
    onMonthChange?: (month: number) => void

    /**function to be called when user choose new year (new year will be passed as argument to the function) */
    onYearChange?: (year: number) => void
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
    defaultMonth,
    defaultYear,
    onMonthChange,
    onYearChange
}) => {

    const [open, setOpen] = useState<boolean>(false)

    const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth || new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(defaultYear || new Date().getFullYear());

    /**for mobile show drawer to pick a month and year */
    const isMobile = useIsMobile()

    /**this variable to prevent onYearChange to be called on first render, as no way
     * because it pass default value
     */
    const isSelectYearCalled = useRef(false)

    /**update isSelectYearCalled value to true if change year called */
    const changeIsSelectYearCalled = () => {
        if (!isSelectYearCalled.current)
            isSelectYearCalled.current = true
    }


    const locale = useLocale()

    /**return months with their names and as numbers */
    const months = useMemo(() => Array.from({ length: 12 }).map((_, index) =>
        new Intl.DateTimeFormat(locale, {
            month: 'long'
        }).format(new Date(2020, index, 1))
    ), [locale])



    /**function handle new month selection and call the function to handle the change
     * 
     * if passed from the parent component
     */
    const handleMonthChange = (mIndex: number) => {

        setSelectedMonth(mIndex)

        //on select a new month then close the popover
        setOpen(false)

        //pass the new month index to the handle function passed from the parent
        if (onMonthChange)
            onMonthChange(mIndex)
    }

    const prevYear = () => {
        changeIsSelectYearCalled()
        setSelectedYear(year => year - 1)
    }

    const nextYear = () => {
        changeIsSelectYearCalled()
        setSelectedYear(year => year + 1)
    }

    useEffect(() => {
        if (isSelectYearCalled.current)
            onYearChange?.(selectedYear)
    }, [selectedYear])

    if (isMobile)
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>

                    <div className={`flex items-center gap-2 cursor-pointer
                    ${open ? 'text-[var(--color-grey-400)]' : ''}`}>
                        <CalendarTrigger
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            months={months}
                        />
                    </div>

                </DrawerTrigger>

                <DrawerContent>
                    <CustomCalendar
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        prevYear={prevYear}
                        nextYear={nextYear}
                        months={months}
                        handleMonthChange={handleMonthChange}
                    />
                </DrawerContent>
            </Drawer>
        )

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <div className={`flex items-center gap-2 cursor-pointer
                    ${open ? 'text-[var(--color-grey-600)]' : ''}`}>
                    <CalendarTrigger
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        months={months}
                    />
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto">
                <CustomCalendar
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    prevYear={prevYear}
                    nextYear={nextYear}
                    months={months}
                    handleMonthChange={handleMonthChange}
                />
            </PopoverContent>
        </Popover>
    )
}



/**The calnder to display in the popover or drawe */
const CustomCalendar = ({
    selectedYear,
    selectedMonth,
    prevYear,
    nextYear,
    months,
    handleMonthChange
}: {
    selectedYear: number
    selectedMonth: number
    prevYear: () => void
    nextYear: () => void
    months: string[]
    handleMonthChange: (month: number) => void
}) => {

    const dir = useDirection()

    return (
        <div className="flex flex-col justify-center items-center gap-3">

            <div
                className="basis-3/4 flex justify-between items-center gap-4"
            >
                <Button
                    variant='ghost'
                    onClick={prevYear}
                    className="w-1/4"
                >
                    {dir === 'ltr' ? <MdArrowBackIos /> : <MdArrowForwardIos />}
                </Button>

                <span className="grow text-xl font-semibold">{selectedYear}</span>

                <Button
                    variant='ghost'
                    onClick={nextYear}
                    disabled={selectedYear + 1 > new Date().getFullYear()}
                    className="w-1/4"
                >
                    {dir === 'ltr' ? <MdArrowForwardIos /> : <MdArrowBackIos />}
                </Button>
            </div>

            <div className="grid grid-cols-3 grid-rows-4 gap-4">
                {months.map((month, index) => (
                    <Button
                        variant={'ghost'}
                        key={index}
                        onClick={() => handleMonthChange(index)}
                        className={`rounded-md py-1 px-2 
                                            ${selectedMonth === index ? 'bg-brand-500 dark:bg-brand-600' : ''}`}
                        disabled={dayjs(`${selectedYear}-${index + 1}-1`).startOf('month') > dayjs().startOf('month')}
                    >
                        {month}
                    </Button>
                ))}
            </div>

        </div>
    )
}

/**This component render a label that click on it trigger the calendar
 * 
 * the component shows the current month and year selected by the user
 * 
 * e.g. February, 2025
 */
const CalendarTrigger = ({
    months,
    selectedMonth,
    selectedYear
}: {
    months: string[]
    selectedMonth: number
    selectedYear: number
}) => {
    return (
        <>
            <span className="font-semibold text-xl ">
                {months[selectedMonth]}{', '} {selectedYear}

            </span>
            <MdCalendarMonth size={17} />
        </>
    )
}



export default MonthYearPicker