/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { FailedRecord as EducationApplicationUseCasesProfessorsCreateProfessorsCommandFailedRecord } from '../../../../../../models/Education/Application/UseCases/Professors/CreateProfessorsCommand/failed-record';
export interface CreateProfessorsResponse {
  failedRecords?: number;
  failedRecordsDetails?: Array<EducationApplicationUseCasesProfessorsCreateProfessorsCommandFailedRecord> | null;
  message?: string | null;
  totalRecords?: number;
  validRecords?: number;
}
