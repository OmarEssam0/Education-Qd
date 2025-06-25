import { HttpInterceptorFn } from '@angular/common/http';

export const headeresInterceptor: HttpInterceptorFn = (req, next) => {
let token = '';
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token') || '';
  }

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(modifiedReq);
}
