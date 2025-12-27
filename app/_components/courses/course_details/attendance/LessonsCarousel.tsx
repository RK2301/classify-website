'use client'

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Lesson } from "@rkh-ms/classify-lib/interfaces"

import LessonItem from "@/app/_components/courses/course_details/attendance/LessonItem"
import IconButton from "@/app/_components/IconButton"
import SwapIcon from "@/app/_components/SwapIcon"
import { useHoverScroll } from "@/app/_hooks/useHoverScroll"

interface LessonsCarouselProps {
    lessons: Lesson[]
}

/**This component shows a carousel for a lessons that can be selected to report attendance */
const LessonsCarousel: React.FC<LessonsCarouselProps> = ({ lessons }) => {

    const [showStartShadow, setShowStartShadow] = useState<boolean>(false)
    const [showeEndShadow, setShowEndShadow] = useState<boolean>(false)

    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const { startScrolling, stopScrolling } = useHoverScroll(scrollContainerRef)


    /**based on scrolling decide if need to show shadow and arrow button for both sides of the container
     * 
     * for example if scroll is on the start of the container then no need to show scroll to start button
     * 
     * and if we reach the end of the container, then no need to show scroll to end arrow button
     */
    const checkScroll = () => {
        if (scrollContainerRef.current) {

            const {
                //How far the container is scrolled horizontally.
                scrollLeft,

                //Total width of all content inside the container.
                scrollWidth,

                //Visible width of the container, to the viewport
                clientWidth
            } = scrollContainerRef.current


            //  the absolute value for scroll over left
            //  for rtl direction it will have negative values
            const scrollStart = Math.abs(scrollLeft)

            // if some scroll to the left done then show the left button and shadow
            // otherwise hide the shadow and left arrow button
            setShowStartShadow(scrollStart > 1)

            //  if user scroll left maximum and the container width (of the lessons) is equal or 
            //  more the overall width of the lessons container, that's mean user can no more 
            //  scroll to the left and reachs the end
            //  so right shadow & button can be hidden
            setShowEndShadow(!(scrollStart + clientWidth >= scrollWidth - 1))
        }
    }

    /**when the component check if right arrow & shadow need to be displayed
     * if the actual width to scroll more the container width visible in the viewport
     * and not reach the end of the scroll, then show the shadow & arrow
     */
    useEffect(() => {
        if (scrollContainerRef.current) {

            const {
                scrollLeft,
                scrollWidth,
                clientWidth
            } = scrollContainerRef.current

            const scrollStart = Math.abs(scrollLeft)

            setShowEndShadow((scrollWidth > clientWidth) && (scrollStart + clientWidth < scrollWidth - 1))
        }
    }, [])


    return (
        <div className="relative">

            {/**Start Arrow & shadow */}
            {
                showStartShadow &&
                <div className="absolute top-0 bottom-0 start-0 z-10 flex items-center">
                    {/**Shadow */}
                    <div className="absolute start-0 top-0 bottom-0 w-13 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-black/10 dark:from-[#1e293b] to-transparent pointer-events-none" />

                    {/**Start Arrow */}
                    <IconButton
                        className="absolute -start-3 p-1"
                        onMouseEnter={() => startScrolling('start')}
                        onMouseLeave={stopScrolling}
                    >
                        <SwapIcon
                            ltrIcon={<ChevronLeft />}
                            rtlIcon={<ChevronRight />}
                        />
                    </IconButton>
                </div>
            }


            {/**Lessons container - scrollable */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex items-center gap-2 px-1
                    overflow-x-auto
                    scrollbar-hide"
            >
                {lessons.map(lesson => <LessonItem key={lesson.id} lesson={lesson} />)}
            </div>


            {/**End Arrow & shadow */}
            {
                showeEndShadow &&
                <div className="absolute top-0 bottom-0 end-0 z-10 flex items-center">
                    {/**Shadow */}
                    <div className="absolute end-0 top-0 bottom-0 w-13 ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-black/10 dark:from-[#1e293b]  to-transparent pointer-events-none" />

                    {/**End Arrow */}
                    <IconButton
                        className="absolute -end-3 p-1"
                        onMouseEnter={() => startScrolling('end')}
                        onMouseLeave={stopScrolling}
                    >
                        <SwapIcon
                            ltrIcon={<ChevronRight />}
                            rtlIcon={<ChevronLeft />}
                        />
                    </IconButton>
                </div>
            }
        </div>
    )

}

export default LessonsCarousel