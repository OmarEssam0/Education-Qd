/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetStudentResponse as EducationApplicationUseCasesStudentsGetStudentQueryGetStudentResponse } from '../../models/Education/Application/UseCases/Students/GetStudentQuery/get-student-response';

export interface ApiStudentsGetStudentGet$Params {
  Id: string;
}

export function apiStudentsGetStudentGet(http: HttpClient, rootUrl: string, params: ApiStudentsGetStudentGet$Params, context?: HttpContext): Observable<StrictHttpResponse<EducationApplicationUseCasesStudentsGetStudentQueryGetStudentResponse>> {
  const rb = new RequestBuilder(rootUrl, apiStudentsGetStudentGet.PATH, 'get');
  if (params) {
    rb.query('Id', params.Id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EducationApplicationUseCasesStudentsGetStudentQueryGetStudentResponse>;
    })
  );
}

apiStudentsGetStudentGet.PATH = '/api/Students/GetStudent';
