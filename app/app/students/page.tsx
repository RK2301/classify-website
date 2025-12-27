import { restrictedRouteServer } from "@/app/_components/access_control/restrictedRouteServer"
import StudnetsTable from "@/app/_components/StudentsTable"
import StudentsTableOperations from "@/app/_components/StudentsTableOperations"
import { getSearchParams } from "@/app/_utils/getSearchParams"
import getServerAxios from "@/app/_utils/getServerAxios"
import { PaginationResponse, StudentQuery } from "@rkh-ms/classify-lib"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

export const metadata = {
    title: 'Students'
}

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
////////////////react-select for mutliselects for grades
const StundetsPage = async ({ searchParams }: Props) => {

    //protect the route for manager only
    await restrictedRouteServer(Actions.readAny, Resources.Student)

    //get search params and attach them to the request
    const params = getSearchParams(await searchParams)


    //fetch teachers 
    const axios = await getServerAxios()
    const res = await axios(`/api/users/students?${params}`)
    const students = res.data as PaginationResponse<StudentQuery>

    console.log(students);


    // if (Math.random() > 0.5)
    //     throw new Error('Testing ....')


    return (
        <div className="flex flex-col gap-4 pt-1 w-full">
            <StudentsTableOperations />
            <StudnetsTable students={students} />
        </div>
    )
}

export default StundetsPage