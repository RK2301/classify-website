'use client'
import {motion} from "framer-motion"

/**Clinet component that render a container for courses cards,
 * 
 * and give each card an animation
 */
const AnimatedCoursesContainer = ({children}: {children: React.ReactNode}) => {

    return(
        <motion.div
         className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-4"
         initial="hidden"
         animate='visible'
         variants={{
            hidden:{opacity: 0},
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.12 // delay between each course card
                }
            }
         }}
         >
            {children}
        </motion.div>
    )
}

export default AnimatedCoursesContainer