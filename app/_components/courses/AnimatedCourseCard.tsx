'use client'
import {motion} from "framer-motion"


/**Client component that render the container of each course card, and give it a animation */
const AnimatedCourseCard = ({children}: {children: React.ReactNode}) => {

    return(
        <motion.div
            className="flex flex-col gap-4 p-4
                bg-(--color-grey-0)
                rounded-lg border border-(--color-grey-200)
                shadow-sm hover:shadow-xl
                "
               
            variants={{
                hidden: {opacity: 0, y: 20},
                visible: {
                    opacity: 1, 
                    y: 0, 
                    transition: {duration: 0.35, ease: 'easeOut'}
                }
            }}>
            {children}
        </motion.div>
    )
}

export default AnimatedCourseCard