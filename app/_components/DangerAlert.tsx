'use client'

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

type DangerAlertProps = {
    /**Title of the alert */
    title?: string;

    /**Description of the alert */
    description?: string;
}

/**This component render a danger alert using Alert component from shadcn/ui */
const DangerAlert: React.FC<DangerAlertProps> = ({
    title,
    description
}) => {

    return (
        <Alert
            variant={'destructive'}
            className="
                         bg-red-50 dark:bg-red-900
                            p-4 rounded-md
                          text-red-800 dark:text-red-100!
                        "
        >
            <AlertCircleIcon />

            {
                title &&
                <AlertTitle className="font-semibold">
                    {title}
                </AlertTitle>
            }

            {
                description &&
                <AlertDescription className="mt-1 text-sm text-red-900! dark:text-red-200!">
                    {description}
                </AlertDescription>
            }
        </Alert>
    )
}

export default DangerAlert