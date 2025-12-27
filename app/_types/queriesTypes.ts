/**This file will have types for responses may receive from server
 * after fetch some data
 * e.g. courses, lessons, etc.
 */

import { StudentSpecificAttr, TeacherSpecificAttr, UserAttributes } from "@rkh-ms/classify-lib";
import { MaterialFilesKeys } from "@rkh-ms/classify-lib/enums";
import { Attendance, Course, Lesson, Material, MaterialFiles, StudentCourse, Subject, TeacherCourse } from "@rkh-ms/classify-lib/interfaces";

/**structure of course data after fetch from server
 * 
 * e.g. on get courses, or get course by id
 */
export interface CourseQuery extends Course {
    Subject: Subject,
    Teachers: TeacherSpecificAttr & {
        User: Pick<UserAttributes, 'firstName' | 'lastName'>
    }[]
}


/**Structure of response from the server for getting all materials related to some course */
export interface MaterialQuery extends Material {
    MaterialFiles: Exclude<MaterialFiles, MaterialFilesKeys.URL>[]
}


/**Struture of response from server for getting teachers course */
export interface TeachersCourse extends TeacherCourse {
    Teacher: TeacherSpecificAttr & {
        User: Pick<UserAttributes, 'firstName' | 'lastName'>
    }
}


/**Struture of response from server for getting students course (enrolled or withdrawal) */
export interface StudentsCourse extends StudentCourse {
    Student: StudentSpecificAttr & {
        User: Pick<UserAttributes, 'firstName' | 'lastName'>
    }
}


/**Structure of response from server for getting a lesson attendance */
export interface Attendances extends Pick<UserAttributes, 'firstName' | 'lastName' | 'id'> {
    Attendances: [Attendance]
}


/**Sturcture of response received from server for feetching all lessons to show inside calendar */
export interface LessonCalendar extends Lesson {
    Course: Course & {
        Teachers: TeacherSpecificAttr & {
            User: Pick<UserAttributes, 'id' | 'firstName' | 'lastName'>
        }[]
    }
}