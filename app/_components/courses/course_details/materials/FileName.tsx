'use client'

import Image, { StaticImageData } from "next/image"

import { MaterialFiles } from "@rkh-ms/classify-lib/interfaces"


import pdf from '@/public/filesTypes/pdf.png'
import docx from '@/public/filesTypes/word.png'
import pptx from '@/public/filesTypes/powerpoint.png'
import txt from '@/public/filesTypes/text.png'
import xlsx from '@/public/filesTypes/excel.png'
import image from '@/public/filesTypes/image-icon.png'
import mp4 from '@/public/filesTypes/mp4.png'
import html from '@/public/filesTypes/html.png'
import useRequest from "@/app/_hooks/use-request"
import { toast } from "sonner"
import { downloadFileAction } from "@/app/_actions/downloadFileAction"
import { useTranslations } from "next-intl"


/**This record map for each file type format a prober image.
 * 
 * for instance, for docx will map to a word icon image
 */
const FileTypeIcon: Record<string, StaticImageData> = {
    pdf,
    docx,
    pptx,
    txt,
    xlsx,
    image,
    mp4,
    html
}


interface FileNameProps {
    file: MaterialFiles
}


/**This component shows file name and icon represent it's type
 * 
 * clicking on file name will make a request to download it
 */
const FileName: React.FC<FileNameProps> = ({ file }) => {


    const fileName = file.name.split('.')
    const fileType = fileName[fileName.length - 1]

    /**if file is image, then show image icon
     * no need to show different icons for different images types
     */
    const isImage = file.type.split('/')[0] === 'image'

    /**set icon to show
     * 
     * if image, then show icon image.
     * 
     * if another type and exists in the list then show it.
     * 
     * otherwise, render a default icon to be displayed
     */
    const fileSrc = isImage ? FileTypeIcon['image'] :
        FileTypeIcon[fileType] ? FileTypeIcon[fileType] : FileTypeIcon.txt


    const t = useTranslations()
    const { doRequest } = useRequest<string>({
        // after a success in getting a url to download the file
        // make the request to download it (from Firebase storage)
        onSuccess: (url) => {
            window.open(url, '_blank')
        }
    })


    /**When user click on file name, a request will be made, to download the file */
    const handleClick = () => {
        toast.promise(doRequest(() => downloadFileAction(file.materialId, file.id)), {
            loading: t('pleaseWait')
        })
    }

    return (
        <div className="min-w-[90%] flex items-center gap-2">
            <Image src={fileSrc} height={20} alt='' />

            <div
                className="max-w-4/5 truncate
                    hover:underline cursor-pointer"
                onClick={handleClick}
            >
                {file.name}
            </div>
        </div>
    )
}

export default FileName