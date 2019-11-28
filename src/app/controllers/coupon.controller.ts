import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Coupon} from '../models/coupon';


@Injectable()
export class CouponController {
    coupons: Coupon[];
    private headers: HttpHeaders;
    private baseUrl: string;

    constructor(private http: HttpClient) {
        // this.baseUrl = 'https://bluemark.azurewebsites.net';
        this.baseUrl = 'http://localhost:3000';
    }

    newHeader() {
        this.headers = new HttpHeaders();
        this.headers = this.headers
                            .set('Content-Type', 'application/json; charset=utf-8')
                            .set('Authorization', localStorage.getItem('token'));
    }

    getMyCoupons() {
        this.newHeader();
        return this.http.get<Coupon[]>(this.baseUrl + `/api/coupons`, {headers: this.headers});
    }

    getCoupon(coupon: Coupon) {
        this.newHeader();
        return this.http.get<Coupon>(this.baseUrl + `/api/coupons/${coupon._id}`, {headers: this.headers});
    }

    createCoupon(idCompany: string) {
        this.newHeader();
        return this.http.post<Coupon>(this.baseUrl + `/api/promotions/${idCompany}/coupons`, null, {headers: this.headers});
    }

    editCoupon(coupon: Coupon) {
        this.newHeader();
        return this.http.put<Coupon>(this.baseUrl + `/api/coupons/${coupon._id}`, coupon, {headers: this.headers});
    }

    deleteCoupon(coupon: Coupon) {
        this.newHeader();
        return this.http.delete(this.baseUrl + `/api/coupons/${coupon._id}`, {headers: this.headers});
    }
}
