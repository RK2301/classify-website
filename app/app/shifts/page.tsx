import 'leaflet/dist/leaflet.css';

import { restrictedRouteServer } from "@/app/_components/access_control/restrictedRouteServer"
import ShiftActionCard from "@/app/_components/shifts/ShiftActionCard"
import ShiftReport from "@/app/_components/shifts/ShiftReport"
import ShiftOperations from "@/app/_components/shifts/ShiftsOperations"
import { SearchParamsType } from "@/app/_types/searchParams"
import { getSearchParams } from "@/app/_utils/getSearchParams"
import getServerAxios from "@/app/_utils/getServerAxios"
import { Shift, ShiftQuery } from "@rkh-ms/classify-lib"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"


export const metadata = {
    title: 'Shifts'
}


const ShiftsPage = async ({ searchParams }: { searchParams: SearchParamsType }) => {

    //limit access to teacher and managers only
    await restrictedRouteServer([Actions.readAny, Actions.readOwn], Resources.Shift)

    //fetch current shift data (if there a active shift)
    const axios = await getServerAxios()
    const reqCurrentShift = axios(`api/shifts/current`)

    //fetch shifts
    const params = getSearchParams(await searchParams)
    const reqShifts = axios(`api/shifts?${params}`)

    const [curShift, shiftsRes] = await Promise.all([reqCurrentShift, reqShifts])

    const currentShift = curShift.data.currentShift as Shift

    const shifts = shiftsRes.data as ShiftQuery[]

    return (
        <>
            <ShiftActionCard currentShift={currentShift} />

            <div className="flex justify-center mt-6 w-full">
                <div className='flex flex-col gap-6 md:gap-4 basis-full lg:basis-4/5'>
                    <ShiftOperations />
                    <ShiftReport shifts={shifts} searchParams={await searchParams} />
                </div>
            </div>

        </>
    )

}

export default ShiftsPage