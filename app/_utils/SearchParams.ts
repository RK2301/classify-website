
/**Respresnet different search params need to deal with in our app */
export enum SearchParams {
    /**to set current page */
    Page = 'page',

    /**pass some value to sort rows based on it */
    sort = 'sort',

    /**to set order of sorting DESC or ASC */
    SortDir = 'sortDir',

    /**to set max number of results per page */
    Limit = ' limit',

    /**to set classes to filter student based on */
    Grades = 'grades',

    /**to filter teacher or managers based on endDate (they still in work or leave)*/
    endDate = 'endDate',

    /**to filter shifts based on year */
    year = 'y',

    /**to filter shifts based on month */
    month = 'm',

    teacher = 'teacher',

    /**indicate a value of subject id (used when work on subjects page to update subject) */
    SubjectId = 'u',

    /**to filter courses based on status */
    CourseStatus = 'status',

    /**To filter courses based on teacher id */
    TeacherId = 'teacherId',

    /**to filter courses based on subject id */
    CourseFilterSubjectId = 'subjectId',

    /**to select a item based on it's id
     * e.g. select a lesson so put it's id as id params
     */
    Id = 'id'
}