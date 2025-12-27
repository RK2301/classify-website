import { Subject } from '@rkh-ms/classify-lib/interfaces'
import getServerAxios from "@/app/_utils/getServerAxios"
import { Separator } from '@/components/ui/separator'
import SubjectsList from '@/app/_components/subjects/SubjectsList'
import SubjectDrawerStateProvider from '@/app/_context/SubjectDrawerState'
import { SearchParamsType } from '@/app/_types/searchParams'
import { getSearchParams } from '@/app/_utils/getSearchParams'
import SubjectFormSide from '@/app/_components/subjects/SubjectFormSide'
import { SearchParams } from '@/app/_utils/SearchParams'

interface SubjectsPageProps {
    searchParams: SearchParamsType
}

const SubjectsPage: React.FC<SubjectsPageProps> = async ({ searchParams }) => {

    const currentSearchParams = await searchParams

    //The id of the currently selected subject to be edit
    const selectedSubject = currentSearchParams[SearchParams.SubjectId] ? Number(currentSearchParams[SearchParams.SubjectId]) : undefined

    // fetch the subjects from the DB
    const axios = await getServerAxios()
    const allSearchParams = getSearchParams(currentSearchParams)


    const { data } = await axios(`/api/subjects${allSearchParams ? `?${allSearchParams}` : ''}`)
    const subjects = data as Subject[]


    return (
        <div
            className='lg:flex lg:gap-6 h-full w-full'
        >

            <SubjectDrawerStateProvider>
                <div className='scrollbar-custom lg:basis-2/5 h-full lg:overflow-auto'>
                    <SubjectsList subjects={subjects} selectedSubject={selectedSubject} />
                </div>

                <div className='hidden lg:flex h-full items-center justify-center'>
                    <div className='h-11/12'>
                        <Separator className='' orientation='vertical' />
                    </div>
                </div>


                <SubjectFormSide searchParams={await searchParams} />
            </SubjectDrawerStateProvider>

        </div>
    )
}

export default SubjectsPage