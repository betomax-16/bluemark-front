
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
                            .set('Authorization', localStorage.getItem('token'));
    }

    getMyPromotions() {
        this.newHeader();
        return this.http.get<Promotion[]>(this.baseUrl + `/api/promotions`, {headers: this.headers});
    }

    getPromotionsByCompany(id: string) {
        this.newHeader();
        return this.http.get<Promotion[]>(this.baseUrl + `/api/companies/${id}/promotions`, {headers: this.headers});
    }

    getPromotions() {
        return this.http.get<Promotion[]>(this.baseUrl + `/api/promotions`);
    }

    getPromotion(id: string) {
        return this.http.get<Promotion>(this.baseUrl + `/api/promotions/${id}`);
    }

    createPromotion(promotion: Promotion, image?: File) {
        this.newHeader();
        const uploadData = new FormData();
        if (image) {
            const ext = image.name.split('.').pop();
            uploadData.append('photo', image, image.name + '-' + Date.now() + '.' + ext);
        }
        // tslint:disable-next-line:forin
        for (const key in promotion) {
            uploadData.append(key, promotion[key]);
        }
        return this.http.post<Promotion>(this.baseUrl + `/api/promotions`, uploadData, {headers: this.headers});
    }

    updatePromotion(promotion: Promotion, image?: File) {
        this.newHeader();
        const uploadData = new FormData();
        if (image) {
            const ext = image.name.split('.').pop();
            uploadData.append('photo', image, image.name + '-' + Date.now() + '.' + ext);
        }
        // tslint:disable-next-line:forin
        for (const key in promotion) {
            uploadData.append(key, promotion[key]);
        }
        return this.http.put<Promotion>(this.baseUrl + `/api/promotions/${promotion._id}`, uploadData, {headers: this.headers});
    }

    deletePromotion(promotion: Promotion) {
        this.newHeader();
        return this.http.delete<Promotion>(this.baseUrl + `/api/promotions/${promotion._id}`, {headers: this.headers});
    }
}
