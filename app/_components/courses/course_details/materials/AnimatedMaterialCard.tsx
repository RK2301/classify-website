'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'


/**This component will render animated material card for course materials*/
const AnimatedMaterialCard = ({
    children,
}: {
    children: React.ReactNode
}) => {

    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: false,
        margin: "-10% 0px"
    })

    return (
        <motion.div
            ref={ref}

            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: 'easeOut' }
                }
            }}

            animate={{
                scale: isInView ? 1 : 0.9,
                opacity: isInView ? 1 : 0.9,
                transition: {duration: 0.3, ease: 'easeOut'}
            }}

            className="flex flex-col gap-3 
            border border-(--color-grey-200)
            bg-(--color-grey-0)
            rounded-lg p-2
            "
        >
            {children}
        </motion.div>
    )
}

export default AnimatedMaterialCard