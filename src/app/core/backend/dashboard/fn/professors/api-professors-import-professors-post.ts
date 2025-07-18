/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateProfessorsResponse as EducationApplicationUseCasesProfessorsCreateProfessorsCommandCreateProfessorsResponse } from '../../models/Education/Application/UseCases/Professors/CreateProfessorsCommand/create-professors-response';

export interface ApiProfessorsImportProfessorsPost$Params {
      body?: {
'ProfessorsExcel'?: Blob;
}
}

export function apiProfessorsImportProfessorsPost(http: HttpClient, rootUrl: string, params?: ApiProfessorsImportProfessorsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<EducationApplicationUseCasesProfessorsCreateProfessorsCommandCreateProfessorsResponse>> {
  const rb = new RequestBuilder(rootUrl, apiProfessorsImportProfessorsPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EducationApplicationUseCasesProfessorsCreateProfessorsCommandCreateProfessorsResponse>;
    })
  );
}

apiProfessorsImportProfessorsPost.PATH = '/api/Professors/ImportProfessors';
