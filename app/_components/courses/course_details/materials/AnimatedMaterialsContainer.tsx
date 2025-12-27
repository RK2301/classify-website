'use client'
import { motion } from 'framer-motion'


/**This component will render container for materials cards
 * 
 * and give each material an animation
 */
const AnimatedMaterialsContainer = ({
    children,
}: {
    children: React.ReactNode
}) => {

    return (
        <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate="visible"

            variants={{
                hidden: {
                    opacity: 0.4
                },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1 // delay between each material item
                    }
                }
            }}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedMaterialsContainer   