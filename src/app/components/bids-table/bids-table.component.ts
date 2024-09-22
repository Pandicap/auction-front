import {Component, Input, output} from '@angular/core';
import {DataViewModule} from "primeng/dataview";
import {PrimeTemplate} from "primeng/api";
import {ICreateOrderRequest, NgxPayPalModule} from "ngx-paypal";
import * as http from "node:http";

@Component({
  selector: 'app-bids-table',
  standalone: true,
  imports: [DataViewModule, PrimeTemplate, NgxPayPalModule],
  templateUrl: './bids-table.component.html',
  styleUrl: './bids-table.component.scss',
})
export class BidsTableComponent {
  @Input()
  data: any[] = [];
  onOpenDetails = output<number>();
  payPalConfig: any;

  constructor() {
    console.log(this.data)
  }

  ngOnInit() {
    console.log(this.data)
  }

  ngAfterViewInit() {
    console.log(this.data)
  }

  openDetails(auctionId: number) {
    this.onOpenDetails.emit(auctionId);
  }

  payForBid(bid: any) {

  }

  private initConfig(): void {}
}
