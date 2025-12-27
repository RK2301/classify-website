import { restrictedRouteServer } from "@/app/_components/access_control/restrictedRouteServer"
import TeachersTable from "@/app/_components/TeachersTable"
import TeachersTableOperations from "@/app/_components/TeachersTableOperations"
import { getSearchParams } from "@/app/_utils/getSearchParams"
import getServerAxios from "@/app/_utils/getServerAxios"
import { PaginationResponse, TeacherQuery } from "@rkh-ms/classify-lib"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"


export const metadata = {
    title: 'Teachers'
}

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const TeachersPage = async ({ searchParams }: Props) => {

    //protect the route for manager only
    await restrictedRouteServer(Actions.readAny, Resources.Student)

    //get search params and attach them to the request
    const params = getSearchParams(await searchParams)

    //fetch teachers 
    const axios = await getServerAxios()
    const res = await axios(`/api/users/teachers?${params}`)
    const teachers = res.data as PaginationResponse<TeacherQuery>

    console.log(teachers);


    // if (Math.random() > 0.5)
    //     throw new Error('Testing ....')


    return (
        <div className="flex flex-col gap-4 pt-1 w-full">
            <TeachersTableOperations />
            <TeachersTable teachers={teachers} />
        </div>
    )
}

export default TeachersPage