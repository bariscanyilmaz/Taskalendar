import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";


export class AuthInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const newReq = req.clone({
            headers: req.headers.set(
                'Authorization', 'Bearer ' + token
            )
        });

        return next.handle(newReq);


    }

}