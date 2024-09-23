import {Component, Input, output} from '@angular/core';
import {DataViewModule} from "primeng/dataview";
import {PrimeTemplate} from "primeng/api";
import {ICreateOrderRequest, NgxPayPalModule} from "ngx-paypal";
import * as http from "node:http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-bids-table',
  standalone: true,
  imports: [DataViewModule, PrimeTemplate, NgxPayPalModule, DatePipe],
  templateUrl: './bids-table.component.html',
  styleUrl: './bids-table.component.scss',
})
export class BidsTableComponent {
  @Input()
  data: any[] = [];
  onOpenDetails = output<number>();
  payPalConfig: any;

  constructor() {
    console.log('constructor', this.data);
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
  }

  openDetails(auctionId: number) {
    this.onOpenDetails.emit(auctionId);
  }

  payForBid(bid: any) {}

  private initConfig(): void {}

  checkHighestBidder(bid: any): boolean {
    console.log('checkHighestBidder', bid);
    return (bid.amount > bid.auction.lastestBid || bid.amount == bid.auction.lastestBid);
  }
}
