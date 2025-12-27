import { getTranslations } from "next-intl/server"
import { File } from "lucide-react"


import { API } from "@rkh-ms/classify-lib/api"

import MaterialCard from "@/app/_components/courses/course_details/materials/MaterialCard"
import WrappedEmpty from "@/app/_components/WrappedEmpty"
import { MaterialQuery } from "@/app/_types/queriesTypes"
import getServerAxios from "@/app/_utils/getServerAxios"
import AnimatedMaterialsContainer from "@/app/_components/courses/course_details/materials/AnimatedMaterialsContainer"



type CourseDetailsMaterialsProps = {
    params: Promise<Record<string, string>>,
}

const CourseDetailsMaterials: React.FC<CourseDetailsMaterialsProps> = async ({ params }) => {

    const p = await params
    const courseId = Number(p.courseId)

    const axios = await getServerAxios()
    const t = await getTranslations()

    // make request to get course materials
    const { data } = await axios(API.materials.getMaterials(courseId))
    const materials = data as MaterialQuery[]

    
    // if there are no materials, show empty state
    if(!materials || materials.length === 0) 
        return <WrappedEmpty
                    Icon={File}
                    title={t('noMaterialTitle')}
                    description={t('noMaterialDescription')}
                />

    return (
        <AnimatedMaterialsContainer>
            {materials.map(material => (
                <MaterialCard key={material.id} material={material} />
            ))}
        </AnimatedMaterialsContainer>
    )
}

export default CourseDetailsMaterials