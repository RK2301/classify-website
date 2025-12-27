
/**This component to render a container for a form
 * 
 * @example
 * usage example:
 * 
 * <form>
 *  <FormContainer>
 *      ....
 *  </FormContainer>
 * <form>
 */
const FormContainer = ({ children }: { children: React.ReactNode }) => {

    return (
        <div
            className="flex flex-col items-center gap-3 lg:gap-6 flex-wrap"
        >
            {children}
        </div>
    )
}

export default FormContainer