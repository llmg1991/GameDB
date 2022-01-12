import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders:{
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
                'x-rapidapi-key': '70a497acf7msha4a50c9a1e99a2cp121a5ejsn6221943eea5c'
            },
            setParams:{
                key: '3d34f08ff74a4ed58579e486ed569fd1'
            }
        });
        return next.handle(req);
        
    }
}