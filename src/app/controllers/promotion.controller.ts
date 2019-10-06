
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Promotion} from '../models/promotion';


@Injectable()
export class PromotionController {
    private headers: HttpHeaders;
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:3000';
    }

    newHeader() {
        this.headers = new HttpHeaders();
        this.headers = this.headers
                            .set('Content-Type', 'application/json; charset=utf-8')
                            .set('Authorization', localStorage.getItem('token'));
    }

    getMyPromotions() {
        this.newHeader();
        return this.http.get<Promotion[]>(this.baseUrl + `/api/promotions`, {headers: this.headers});
    }

    getPromotions() {
        return this.http.get<Promotion[]>(this.baseUrl + `/api/promotions`);
    }

    getPromotion(promotion: Promotion) {
        return this.http.get<Promotion>(this.baseUrl + `/api/promotions/${promotion._id}`);
    }

    createPromotion(promotins: Promotion) {
        this.newHeader();
        return this.http.post<Promotion>(this.baseUrl + `/api/promotions`, {headers: this.headers});
    }

    updatePromotion(promotion: Promotion) {
        this.newHeader();
        return this.http.put<Promotion>(this.baseUrl + `/api/promotions/${promotion._id}`, {headers: this.headers});
    }

    deletePromotion(promotion: Promotion) {
        this.newHeader();
        return this.http.delete<Promotion>(this.baseUrl + `/api/promotions/${promotion._id}`, {headers: this.headers});
    }
}
