/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CollegesService } from './services/colleges.service';
import { CoursesService } from './services/courses.service';
import { ProfessorsService } from './services/professors.service';
import { StudentsService } from './services/students.service';
import { TemplateService } from './services/template.service';
import { UniversitiesService } from './services/universities.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CollegesService,
    CoursesService,
    ProfessorsService,
    StudentsService,
    TemplateService,
    UniversitiesService,
    ApiConfiguration
  ],
})
export class DashboardApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<DashboardApiModule> {
    return {
      ngModule: DashboardApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: DashboardApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('DashboardApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
