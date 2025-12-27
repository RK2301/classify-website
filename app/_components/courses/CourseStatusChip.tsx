import { CourseStatus } from "@rkh-ms/classify-lib/enums";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Chip from "../Chip";
import { getTranslations } from "next-intl/server";

dayjs.extend(customParseFormat)

interface CourseStatusChipProps {
    startDate: string;
    endDate: string;
}

/**This component return a chip that represnt current course status
 * - Not started will show a yellow chip
 * - In progress will show a green chip
 * - Completed will show a blue chip
 */
const CourseStatusChip: React.FC<CourseStatusChipProps> = async ({
    startDate,
    endDate
}) => {

    const t = await getTranslations()

    const courseStartDate = dayjs(startDate, 'YYYY-MM-DD');
    const courseEndDate = dayjs(endDate, 'YYYY-MM-DD');
    const now = dayjs();

    const courseStatus: CourseStatus = now.isBefore(courseStartDate)
        ? CourseStatus.NotStarted
        : now.isAfter(courseEndDate)
            ? CourseStatus.Completed
            : CourseStatus.InProgress;

    if (courseStatus === CourseStatus.NotStarted)
        return <Chip variant='warning'>{t('courseUpcoming')}</Chip>

    if (courseStatus === CourseStatus.InProgress)
        return <Chip variant='success'>{t('courseOngoing')}</Chip>

    return <Chip variant='secondary'>{t('courseCompleted')}</Chip>

}

export default CourseStatusChip