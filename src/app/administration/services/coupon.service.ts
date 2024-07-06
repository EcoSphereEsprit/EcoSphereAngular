import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CouponService {

    public baseUrl = "http://localhost:9090/coupon"


    constructor(private http: HttpClient) { }


    sendCouponToUser(coupon: string, mailUser: string) {
        const token = localStorage.getItem("token");
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = { coupon, mailUser };
        return this.http.post(`${this.baseUrl}/sendCouponMail`, body, { headers });
    }
}
