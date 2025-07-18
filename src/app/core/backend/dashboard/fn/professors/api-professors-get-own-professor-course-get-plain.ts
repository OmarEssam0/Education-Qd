/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetOwnProfessorCourseResponse as EducationApplicationUseCasesProfessorsGetOwnProfessorCourseQueryGetOwnProfessorCourseResponse } from '../../models/Education/Application/UseCases/Professors/GetOwnProfessorCourseQuery/get-own-professor-course-response';

export interface ApiProfessorsGetOwnProfessorCourseGet$Plain$Params {
  ProfessorCourseId: string;
}

export function apiProfessorsGetOwnProfessorCourseGet$Plain(http: HttpClient, rootUrl: string, params: ApiProfessorsGetOwnProfessorCourseGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<EducationApplicationUseCasesProfessorsGetOwnProfessorCourseQueryGetOwnProfessorCourseResponse>> {
  const rb = new RequestBuilder(rootUrl, apiProfessorsGetOwnProfessorCourseGet$Plain.PATH, 'get');
  if (params) {
    rb.query('ProfessorCourseId', params.ProfessorCourseId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EducationApplicationUseCasesProfessorsGetOwnProfessorCourseQueryGetOwnProfessorCourseResponse>;
    })
  );
}

apiProfessorsGetOwnProfessorCourseGet$Plain.PATH = '/api/Professors/GetOwnProfessorCourse';
