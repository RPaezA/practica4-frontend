import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()
export class PeticionInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptando petición:', req.url);
    let peticion = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Authorization': 'Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhdWwucGFlejZAb3V0bG9vay5jb20iLCJpZCI6MSwiaWF0IjoxNzYyNDM2NDYyLCJleHAiOjE3NjI0Nzk2NjJ9.LTuAEL1zHpCvNpE4FA0JkIfllSRJDexUfkG5SercbY8'
      }
    });
    return handler.handle(peticion).pipe(tap(()=>{},
    (error:any)=>{
      console.log('Error en la petición');
      if (error instanceof HttpErrorResponse) {
        if (error.status !== 401) {
          return
       }
       this.router.navigate(['/auth/login']);
      }
    }))
  }
}
