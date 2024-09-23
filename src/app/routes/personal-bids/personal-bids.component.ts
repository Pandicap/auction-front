import { Component } from '@angular/core';
import { BidsService } from '../../services/bids.service';
import { BidsTableComponent } from '../../components/bids-table/bids-table.component';
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ICreateOrderRequest, IPayPalConfig, NgxPayPalModule} from "ngx-paypal";

@Component({
  selector: 'app-personal-bids',
  standalone: true,
  imports: [
    BidsTableComponent,
    DialogModule,
    ReactiveFormsModule,
    NgxPayPalModule,
  ],
  templateUrl: './personal-bids.component.html',
  styleUrl: './personal-bids.component.scss',
})
export class PersonalBidsComponent {
  tableData: any[] = [];
  detailObject: any;
  bidDialogVisible: boolean = false;
  auctionId: number = 0;
  bidForm: FormGroup;

  public payPalConfig ? : IPayPalConfig;

  constructor(
    private bidsService: BidsService,
    private fb: FormBuilder,
  ) {
    this.bidForm = fb.group({
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.bidsService.getBidsForUser().subscribe((table: any) => {
      console.log(table);
      const highestBids = Object.values(
        table.reduce((acc: any, bid: any) => {
          const auctionId = bid.auction.id;
          // If there is no existing entry or the current bid has a higher amount, update the entry
          if (!acc[auctionId] || bid.amount > acc[auctionId].amount) {
            acc[auctionId] = bid;
          }
          return acc;
        }, {})
      );

      // this.tableData = highestBids

      console.log('highest bids ', highestBids)
      let tempData = highestBids.map((bid: any) => {
        return {
          ...bid,
          paypalConfig: {
            currency: 'USD',
            clientId: 'AU6MFRGR5-BWiQ_iCfICnKGd1zrbByiUNjgP34OQIQxylWT9t0jjcXZVO1NlR68L6Svpp2jUkaNUwTHW',
            createOrderOnClient: (data: any) =>
              <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: bid.amount,
                      breakdown: {
                        item_total: {
                          currency_code: 'USD',
                          value: bid.amount,
                        },
                      },
                    },
                    items: [
                      {
                        name: bid.auction.title,
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                          currency_code: 'USD',
                          value: bid.amount,
                        },
                      },
                    ],
                  },
                ],
              },
            advanced: {
              commit: 'true',
            },
            style: {
              label: 'paypal',
              layout: 'horizontal',
              shape: 'rect',
              color: 'gold',
              size: 'small'
            },
            onApprove: (data: any, actions: any) => {
              this.bidsService.completePayment(bid.id);
              console.log('done', data, actions);
            },
            onCancel: (data: any, actions: any) => {
              console.log('OnCancel', data, actions);
              // this.showCancel = true;
            },
            onError: (err: any) => {
              console.log('OnError', err);
              // this.showError = true;
            },
            onClick: (data: any, actions: any) => {
              console.log('onClick', data, actions);
              // this.resetStatus();
            },
          }
        }
      });
      this.tableData = tempData
    console.log('data after paypal config ', tempData, this.tableData)
    });
  }

  openDetails(itemId: number) {
    this.bidDialogVisible = true;
    this.auctionId = itemId;
    this.detailObject = this.tableData.filter(
      (x: any) => x.auction.id === itemId,
    )[0];
    console.log(this.detailObject);
  }

  bid() {
    let bidData = this.bidForm.getRawValue();
    bidData.time = 'now';
    bidData.auctionId = this.auctionId;
    this.bidsService.createBid(bidData).subscribe((res: any) => {
      this.bidDialogVisible = false;
      this.getTable();
    });
  }

  delete() {
    this.bidsService.deleteBid(this.detailObject.id).subscribe((res: any) => {
      this.bidDialogVisible = false;
      this.getTable();
    });
  }
}
