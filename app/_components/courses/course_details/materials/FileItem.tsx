
import { MaterialFiles } from "@rkh-ms/classify-lib/interfaces"
import { Actions, Resources } from "@rkh-ms/classify-lib/accesscontrol"

import FileName from "@/app/_components/courses/course_details/materials/FileName"
import RestrictedServer from "@/app/_components/access_control/RestrictedServer"
import DeleteFile from "@/app/_components/courses/course_details/materials/DeleteFile"



interface FileItemProps {
    file: MaterialFiles,
    courseId: number
}



/**This component displays a file details inside a material card.
 * 
 * each item shows: file name and icon represent it's type
 * 
 * delete button for teachers & managers only
 * 
 * when click on file name will make request to download it
 */
const FileItem: React.FC<FileItemProps> = ({ file, courseId }) => {


    return (
        <div className="flex justify-between items-center gap-2">

            {/**file name, and icon represent type */}
            <FileName file={file} />

            {/**Delete button (visible for teachers and managers only) */}
            <RestrictedServer
                action={[Actions.deleteAny, Actions.deleteOwn]}
                resource={Resources.MaterialFiles}>
                <DeleteFile file={file} courseId={courseId} />
            </RestrictedServer>
        </div>
    )
}

export default FileItem