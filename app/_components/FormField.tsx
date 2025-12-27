import { Label } from "@/components/ui/label";

//@eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormInputProps {
    id: string;
    [key: string]: unknown;
}

interface FormFieldProps {
    label?: string;
    /**if set to true, then a * will show before the input label
     ** e.g. => * ID
     */
    required?: boolean;
    error?: string;
    children: React.ReactElement<FormInputProps>;
    className?: string
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    error,
    children,
    className,
    required = false
}) => {

    return (
        <div className={`flex flex-col gap-1 ${className ? className : ''}`}>
            {label && <Label htmlFor={children.props.id} className="ps-2">{required ? `${label} *` : label}</Label>}
            {children}
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}

export default FormField