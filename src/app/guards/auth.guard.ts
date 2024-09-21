import {inject, Injectable} from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler, HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from "../services/local-storage.service";

// @Injectable()
// export class AuthGuard implements HttpInterceptor {
//   constructor(private readonly http: HttpClient) {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler,
//   ): Observable<HttpEvent<any>> {
//     const authToken = localStorage.getItem('userToken');
//     console.log('auth guard ', authToken)
//     const newReq = req.clone({
//       headers: req.headers.append('Authorization', 'Bearer ' + authToken),
//     });
//     return next.handle(newReq);
//   }
// }

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn,): Observable<HttpEvent<any>> {
  let localStorageService = inject(LocalStorageService)
  const authToken = localStorageService.getItem('userToken');
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
