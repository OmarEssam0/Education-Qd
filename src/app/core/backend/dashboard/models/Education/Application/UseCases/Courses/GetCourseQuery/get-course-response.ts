/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { CoursePreDto as EducationApplicationDtosCoursePreDto } from '../../../../../../models/Education/Application/Dtos/course-pre-dto';
import { CollegeDetailsResponseDto as EducationApplicationUseCasesCoursesGetCourseQueryCollegeDetailsResponseDto } from '../../../../../../models/Education/Application/UseCases/Courses/GetCourseQuery/college-details-response-dto';
export interface GetCourseResponse {
  code?: string | null;
  college?: EducationApplicationUseCasesCoursesGetCourseQueryCollegeDetailsResponseDto | null;
  collegeId?: string;
  id?: string;
  prerequisites?: Array<EducationApplicationDtosCoursePreDto> | null;
  title?: string | null;
}
