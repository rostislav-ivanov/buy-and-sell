import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('access_token');

    const apiUrl = req.url.startsWith('http')
      ? req.url
      : `${environment.apiUrl}${req.url}`;

    const authReq = req.clone({
      url: apiUrl, // Set the base API URL
      setHeaders: {
        'Content-Type': 'application/json',
        ...(authToken ? { AuthToken: authToken } : {}), // Conditionally set AuthToken
      },
    });

    return next.handle(authReq);
  }
}
