import { restrictedRouteServer } from "@/app/_components/access_control/restrictedRouteServer"
import ManagersTable from "@/app/_components/ManagersTable"
import ManagersTableOperations from "@/app/_components/ManagersTableOperations"
import { getSearchParams } from "@/app/_utils/getSearchParams"
import getServerAxios from "@/app/_utils/getServerAxios"
import { ManagerQuery, PaginationResponse } from "@rkh-ms/classify-lib"
import { Actions, Resources } from '@rkh-ms/classify-lib/accesscontrol'

export const metadata = {
    title: 'Managers'
}

type ManagersPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ManagersPage: React.FC<ManagersPageProps> = async ({ searchParams }) => {

    //protect the route for manager only
    await restrictedRouteServer(Actions.readAny, Resources.Manager)

    const params = getSearchParams(await searchParams)
    const axios = await getServerAxios()

    //fetch managers data
    const { data } = await axios(`/api/users/managers${params ? `?${params}` : ''}`)
    const managers: PaginationResponse<ManagerQuery> = data


    return (
        <div className="w-full flex flex-col gap-3">
            <ManagersTableOperations />
            <ManagersTable managers={managers} />
        </div>
    )
}

export default ManagersPage