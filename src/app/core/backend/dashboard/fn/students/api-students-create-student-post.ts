/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateStudentCommand as EducationApplicationUseCasesStudentsCreateStudentCommandCreateStudentCommand } from '../../models/Education/Application/UseCases/Students/CreateStudentCommand/create-student-command';
import { CreateStudentResponse as EducationApplicationUseCasesStudentsCreateStudentCommandCreateStudentResponse } from '../../models/Education/Application/UseCases/Students/CreateStudentCommand/create-student-response';

export interface ApiStudentsCreateStudentPost$Params {
      body?: EducationApplicationUseCasesStudentsCreateStudentCommandCreateStudentCommand
}

export function apiStudentsCreateStudentPost(http: HttpClient, rootUrl: string, params?: ApiStudentsCreateStudentPost$Params, context?: HttpContext): Observable<StrictHttpResponse<EducationApplicationUseCasesStudentsCreateStudentCommandCreateStudentResponse>> {
  const rb = new RequestBuilder(rootUrl, apiStudentsCreateStudentPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EducationApplicationUseCasesStudentsCreateStudentCommandCreateStudentResponse>;
    })
  );
}

apiStudentsCreateStudentPost.PATH = '/api/Students/CreateStudent';
