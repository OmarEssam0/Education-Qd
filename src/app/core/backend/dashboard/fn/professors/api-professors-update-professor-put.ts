/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateProfessorCommand as EducationApplicationUseCasesProfessorsUpdateProfessorCommandUpdateProfessorCommand } from '../../models/Education/Application/UseCases/Professors/UpdateProfessorCommand/update-professor-command';
import { UpdateProfessorResponse as EducationApplicationUseCasesProfessorsUpdateProfessorCommandUpdateProfessorResponse } from '../../models/Education/Application/UseCases/Professors/UpdateProfessorCommand/update-professor-response';

export interface ApiProfessorsUpdateProfessorPut$Params {
      body?: EducationApplicationUseCasesProfessorsUpdateProfessorCommandUpdateProfessorCommand
}

export function apiProfessorsUpdateProfessorPut(http: HttpClient, rootUrl: string, params?: ApiProfessorsUpdateProfessorPut$Params, context?: HttpContext): Observable<StrictHttpResponse<EducationApplicationUseCasesProfessorsUpdateProfessorCommandUpdateProfessorResponse>> {
  const rb = new RequestBuilder(rootUrl, apiProfessorsUpdateProfessorPut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EducationApplicationUseCasesProfessorsUpdateProfessorCommandUpdateProfessorResponse>;
    })
  );
}

apiProfessorsUpdateProfessorPut.PATH = '/api/Professors/UpdateProfessor';
