import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://40.76.114.251:5001';

  constructor() { }

  readonly _http = inject(HttpClient);

  login(data:any):Observable<any>{
    return this._http.post(`${this.baseUrl}/api/auth/login`, data )
  }
}
