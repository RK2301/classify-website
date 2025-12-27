import { StudentSpecificAttr, UserAttributes } from "@rkh-ms/classify-lib";
import { CourseKeys } from "@rkh-ms/classify-lib/enums";
import { Course } from "@rkh-ms/classify-lib/interfaces";


export type UserFormFields = Pick<UserAttributes,
    'id' | 'firstName' | 'lastName' | 'email' | 'phone'>

export type StudnetFormFields = UserFormFields &
    Pick<StudentSpecificAttr,
        'grade' | 'fatherName' | 'fatherPhone' | 'motherName' | 'motherPhone'>


/**Type describe the form fields for add, update teacher */
export interface TeacherFormFields extends UserFormFields {
    startDate: Date,
    subjects: string[]
}


/**Type describe the form fields for add course */
export type CourseFormFields = Pick<Course, CourseKeys.TITLE | CourseKeys.START_DATE | CourseKeys.NUMBER_OF_LESSONS | CourseKeys.SUBJECT_ID> & {
    teachers: string[],
    lessons: {
        day: number;
        startTime: string;
        endTime: string
    }[]
}