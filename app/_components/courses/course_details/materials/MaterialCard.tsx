
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

import { MaterialQuery } from "@/app/_types/queriesTypes"
import { Separator } from "@/components/ui/separator"
import List from "@/app/_components/List"
import FileItem from "@/app/_components/courses/course_details/materials/FileItem"
import ButtonGroup from "@/app/_components/ButtonGroup"

import RestrictedServer from "@/app/_components/access_control/RestrictedServer"
import DeleteMaterial from "@/app/_components/courses/course_details/materials/DeleteMaterial"
import UploadFilesForm from "@/app/_components/courses/course_details/materials/UploadFilesForm"
import UpdateMaterialForm from "@/app/_components/courses/course_details/materials/UpdateMaterialForm"
import AnimatedMaterialCard from "@/app/_components/courses/course_details/materials/AnimatedMaterialCard"


interface MaterialCardProps {
    material: MaterialQuery
}

/**This component display a card represent a material related to a course
 * 
 * Title
 * 
 * Description
 * 
 * And list of files (if there any), related to the material
 */
const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {

    return (
        <AnimatedMaterialCard>

            {/**Title and buttons group */}
            <div className="flex justify-between gap-2.5">
                <span className="flex-1 font-medium my-auto">
                    {material.title}
                </span>

                {/**Only teacher and manager can perform such action on material
                 * such as edit, upload more files or delete it
                 */}
                <RestrictedServer
                    action={[Actions.updateAny, Actions.updateOwn]}
                    resource={Resources.Materials}
                >
                    <div className="basis-1/3 lg:basis-1/4">
                        <ButtonGroup>

                            <UpdateMaterialForm
                                courseId={material.courseId}
                                materialId={material.id}
                                title={material.title}
                                description={material.description || undefined}
                            />

                            <UploadFilesForm
                                courseId={material.courseId}
                                materialId={material.id}
                                title={material.title}
                            />

                            <DeleteMaterial
                                courseId={material.courseId}
                                materialId={material.id}
                            />

                        </ButtonGroup>
                    </div>
                </RestrictedServer>

            </div>

            {/*Divider before the description (if any) or files list */}
            <Separator />

            {material.description && (
                <span className="text-[var(--color-grey-600)]">
                    {material.description}
                </span>
            )}

            {/**List of files */}
            {material.MaterialFiles.length > 0 && (
                <div className="lg:flex lg:justify-center">
                    <div className="lg:w-3/4">
                        <List>
                            {
                                material.MaterialFiles.map(file => (
                                    <List.ListItem key={file.id} className="bg-[var(--color-grey-100)]">
                                        <FileItem file={file} courseId={material.courseId} />
                                    </List.ListItem>
                                ))
                            }
                        </List>
                    </div>
                </div>
            )}

        </AnimatedMaterialCard>
    )
}

export default MaterialCard