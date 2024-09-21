import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuctionsService {
  baseUrl: string = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  getAuctions() {
    return this.httpClient.get(`${this.baseUrl}/auctions`);
  }

  getAuction(id: number) {
    return this.httpClient.get(`${this.baseUrl}/auctions/${id}`);
  }

  updateAuction(id: number, data: any) {
    return this.httpClient.put(`${this.baseUrl}/auctions/${id}`, data);
  }

  createAuction(data: any) {
    return this.httpClient.post(`${this.baseUrl}/auctions`, data);
  }

  deleteAuction(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/auctions/${id}`);
  }
}
