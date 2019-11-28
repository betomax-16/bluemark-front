import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Company} from '../models/company';


@Injectable()
export class CompanyController {
    companies: Company[];
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

    getCompanies() {
        this.newHeader();
        return this.http.get<Company[]>(this.baseUrl + `/api/companies`, {headers: this.headers});
    }

    getCompany(id: string) {
        this.newHeader();
        return this.http.get<Company>(this.baseUrl + `/api/companies/${id}`, {headers: this.headers});
    }

    createCompany(company: Company) {
        this.newHeader();
        return this.http.post<Company>(this.baseUrl + '/api/companies', company, {headers: this.headers});
    }

    editCompany(company: Company) {
        this.newHeader();
        return this.http.put<Company>(this.baseUrl + `/api/companies/${company._id}`, company, {headers: this.headers});
    }

    deleteCompany(id: string) {
        this.newHeader();
        return this.http.delete(this.baseUrl + `/api/companies/${id}`, {headers: this.headers});
    }
}
