/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCollegeResponse as EducationApplicationUseCasesCollegesGetCollegeQueryGetCollegeResponse } from '../../models/Education/Application/UseCases/Colleges/GetCollegeQuery/get-college-response';

export interface ApiCollegesGetCollegeGet$Plain$Params {
  Id: string;
}

export function apiCollegesGetCollegeGet$Plain(http: HttpClient, rootUrl: string, params: ApiCollegesGetCollegeGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<EducationApplicationUseCasesCollegesGetCollegeQueryGetCollegeResponse>> {
  const rb = new RequestBuilder(rootUrl, apiCollegesGetCollegeGet$Plain.PATH, 'get');
  if (params) {
    rb.query('Id', params.Id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EducationApplicationUseCasesCollegesGetCollegeQueryGetCollegeResponse>;
    })
  );
}

apiCollegesGetCollegeGet$Plain.PATH = '/api/Colleges/GetCollege';
