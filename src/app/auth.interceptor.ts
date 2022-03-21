import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('req', req);

    const cloned = req.clone({
      headers: req.headers.append('random', 'RANDOM TOKEN')
    });
    
    return next.handle(cloned).pipe(
      tap(e => {
        if (e.type === HttpEventType.Response) {
          console.log('Interceptor response', event);
        }
      })
    );
  }
}