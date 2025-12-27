
import { useTranslations } from "next-intl"
import { FieldErrors, Path, UseFormRegister } from "react-hook-form"

import { MaterialKeys } from "@rkh-ms/classify-lib/enums"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import FormField from "@/app/_components/FormField"
import FormRow from "@/app/_components/form_components/FormRow"

/**Add or update material forms should have at least title & description fields */
type MaterialForm = {
    [MaterialKeys.TITLE]: string,
    [MaterialKeys.DESCRIPTION]?: string,
}


type TitleDescriptionFieldsProps<T extends MaterialForm> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>,
    resErrors: Record<string, string>
}

/**This component render the title & description fields for material
 * 
 * can be used for add or edit material form
 */
const TitleDescriptionFields = <T extends MaterialForm = MaterialForm>({
    register,
    errors,
    resErrors
}: TitleDescriptionFieldsProps<T>) => {

    const t = useTranslations()

    const getKey = <K extends keyof MaterialForm>(key: K) => key as unknown as Path<T>


    return (
        <>
            {/**Title input */}
            <FormRow cols={1}>

                <FormField
                    label={t('title')}
                    error={errors[MaterialKeys.TITLE]?.message as string | undefined || resErrors[MaterialKeys.TITLE]}
                    required
                >
                    <Input
                        id={MaterialKeys.TITLE}
                        {...register(getKey(MaterialKeys.TITLE), {
                            required: t('required')
                        })}
                    />
                </FormField>

            </FormRow>


            {/**Description (Optional) */}
            <FormRow cols={1}>

                <FormField
                    label={t('description')}
                    error={errors[MaterialKeys.DESCRIPTION]?.message as string | undefined || resErrors[MaterialKeys.DESCRIPTION]}
                >
                    <Textarea
                        rows={4}
                        id={MaterialKeys.DESCRIPTION}
                        {...register(getKey(MaterialKeys.DESCRIPTION))}
                    />
                </FormField>

            </FormRow>
        </>
    )
}

export default TitleDescriptionFields