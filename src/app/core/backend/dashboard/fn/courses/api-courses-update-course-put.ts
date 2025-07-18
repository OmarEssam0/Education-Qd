/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateCourseCommand as EducationApplicationUseCasesCoursesUpdateCourseCommandUpdateCourseCommand } from '../../models/Education/Application/UseCases/Courses/UpdateCourseCommand/update-course-command';
import { UpdateCourseResponse as EducationApplicationUseCasesCoursesUpdateCourseCommandUpdateCourseResponse } from '../../models/Education/Application/UseCases/Courses/UpdateCourseCommand/update-course-response';

export interface ApiCoursesUpdateCoursePut$Params {
      body?: EducationApplicationUseCasesCoursesUpdateCourseCommandUpdateCourseCommand
}

export function apiCoursesUpdateCoursePut(http: HttpClient, rootUrl: string, params?: ApiCoursesUpdateCoursePut$Params, context?: HttpContext): Observable<StrictHttpResponse<EducationApplicationUseCasesCoursesUpdateCourseCommandUpdateCourseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiCoursesUpdateCoursePut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EducationApplicationUseCasesCoursesUpdateCourseCommandUpdateCourseResponse>;
    })
  );
}

apiCoursesUpdateCoursePut.PATH = '/api/Courses/UpdateCourse';
