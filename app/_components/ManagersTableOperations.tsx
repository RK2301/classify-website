import TableSearch from "@/app/_components/SearchInput"
import FilterBasedEndDate from "@/app/_components/FilterBasedEndDate"
import AddManager from "@/app/_components/managers/AddManager"


const ManagersTableOperations = () => {

    return (
        <div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
            <div
                className="w-full md:basis-1/3"
            >
                <TableSearch />
            </div>

            <div
                className="w-full md:basis-1/2"
            >
                <div
                    className="flex items-center justify-center gap-2">

                    <div className="w-[70%]">
                        <FilterBasedEndDate />
                    </div>

                    <div className="grow">
                        <AddManager />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagersTableOperations