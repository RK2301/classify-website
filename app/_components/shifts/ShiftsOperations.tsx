'use client'

import { useClassifyCustomSearchParams } from "@/app/_hooks/useClassifyCustomSearchParams";
import MonthYearPicker from "@/app/_components/calendar/MonthYearPicker";
import { SearchParams } from "@/app/_utils/SearchParams";
import WrappedSelect from "@/app/_components/WrappedSelect";
import { useTranslations } from "next-intl";
import Restricted from "../access_control/Restricted";
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol";
import { useEffect, useState, useTransition } from "react";
import { Option } from "@/app/_types/ListOption";
import useRequest from "@/app/_hooks/use-request";
import getTeacherInfo from "@/app/_actions/getTeachersInfo";


const ShiftOperations = () => {

    const t = useTranslations()
    const { getSearchParam, setSearchParam, deleteSearchParam } = useClassifyCustomSearchParams()

    const [options, setOptions] = useState<Option[]>([])
    const [optionsPending, startTransition] = useTransition()

    const { doRequest } = useRequest<Option[]>({
        onSuccess: (options) => {
            setOptions(options!)
        }
    })

    /**function to fetch teachers options when the list opened */
    const onListOpen = (open: boolean) => {
        //no need every time to fetch the data
        //only if there are no options yet
        //enough one request

        // 2. another case is when user select teacher then reload the page
        // in this case must fecth the data agin so placeholder won't be empty
        if ((open && options.length === 0) ||
            (getSearchParam(SearchParams.teacher) && options.length === 0))
            startTransition(() => doRequest(getTeacherInfo))
    }

    useEffect(() => {
        onListOpen(false)
    }, [])

    const defaultMonth = parseInt(getSearchParam(SearchParams.month)!) - 1 || undefined
    const defaultYear = parseInt(getSearchParam(SearchParams.year)!) || undefined


    /**function to be called when year value change to update year search params accordinly */
    const onYearChange = (year: number) => {
        setSearchParam(SearchParams.year, String(year))
    }

    /**function to be called when year value change to update year search params accordinly */
    const onMonthChange = (month: number) => {
        setSearchParam(SearchParams.month, String(month + 1))
    }

    /**when teacher selected from the list, add or remove his id from the search params */
    const onTeacherSelected = (id: string) => {

        //if id is string then update the value of teacher search param
        if (id)
            setSearchParam(SearchParams.teacher, id)
        else
            deleteSearchParam(SearchParams.teacher)

    }


    return (
        <div className="flex flex-col-reverse items-center 
        md:flex-row md:justify-between
        gap-4 md:gap-2">

            {/**show a select to choose one teacher */}
            <div className="w-full md:w-1/3">

                <Restricted
                    action={Actions.readAny}
                    resource={Resources.Shift}
                >
                    <WrappedSelect
                        options={options}
                        openStateChange={onListOpen}
                        isOptionsLoading={optionsPending}

                        onValueChange={onTeacherSelected}
                        defaultValue={getSearchParam(SearchParams.teacher) || undefined}

                        triggerPlaceholder={t('selectTeacher')}
                        searchPlaceholder={t('searchTeacher')}
                    />
                </Restricted>

            </div>


            {/**month and year picker */}
            <div>
                <MonthYearPicker
                    defaultMonth={defaultMonth}
                    defaultYear={defaultYear}
                    onYearChange={onYearChange}
                    onMonthChange={onMonthChange}
                />
            </div>
        </div>
    );
}

export default ShiftOperations;