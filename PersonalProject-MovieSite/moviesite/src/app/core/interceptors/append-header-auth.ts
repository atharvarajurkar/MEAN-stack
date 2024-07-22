import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AppendHeaderAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {    
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const user = this.authService.currentUser$.value;
    const isApiUrl = request.url.startsWith(`${this.authService.baseURL}/auth/sign`);

    if (user && user.jwtToken && !isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: user.jwtToken },
      });
    }

    return next.handle(request);
  }
}
