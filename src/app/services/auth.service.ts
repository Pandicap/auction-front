import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, data);
  }

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }
}
