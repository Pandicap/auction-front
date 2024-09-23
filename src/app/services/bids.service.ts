import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BidsService {
  baseUrl: string = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  getBids() {
    return this.httpClient.get(`${this.baseUrl}/bids`);
  }

  getBid(id: number) {
    return this.httpClient.get(`${this.baseUrl}/bids/${id}`);
  }

  updateBid(id: number, data: any) {
    return this.httpClient.put(`${this.baseUrl}/bids/${id}`, data);
  }

  createBid(data: any) {
    return this.httpClient.post(`${this.baseUrl}/bids`, data);
  }

  deleteBid(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/bids/${id}`);
  }

  getBidsForUser() {
    return this.httpClient.get(`${this.baseUrl}/bids/for-user`);
  }

  completePayment(id: number) {
    return this.httpClient.patch(`${this.baseUrl}/bids/${id}`, id);
  }
}
