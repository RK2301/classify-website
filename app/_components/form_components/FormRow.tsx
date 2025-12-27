

type FormRowProps = {
    children: React.ReactNode

    /**Number of inputs can be per row
     ** only applies for large screen
     *
     *@default 3
     */
    cols?: 1 | 2 | 3 | 4 | 5 | 6
}

const gridClasses = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
}

/**This component can be used to render a form row that can contain one or multiple inputs at the same row */

const FormRow: React.FC<FormRowProps> = ({
    children,
    cols = 3
}) => {

    return (
        <div
            className={`grid grid-cols-1 ${gridClasses[cols]} gap-3 w-full`}
        >
            {children}
        </div>
    )
}

export default FormRow