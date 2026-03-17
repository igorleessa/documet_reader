import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Blocks protocol-relative URLs (e.g. //evil.com/...) from being used in HTTP requests.
 *
 * Mitigation for: "Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs
 * in Angular HTTP Client" (angular/angular, affected: @angular/common < 19.2.16).
 *
 * Angular 17.x has no upstream patch for this advisory. This interceptor eliminates the
 * specific attack vector (protocol-relative URLs) so XSRF tokens cannot be forwarded to
 * unintended origins by crafted URLs.
 */
@Injectable()
export class UrlGuardInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith('//')) {
      return throwError(() => new Error(
        `Blocked protocol-relative URL to prevent XSRF token leakage: ${req.url}`
      ));
    }
    return next.handle(req);
  }
}
