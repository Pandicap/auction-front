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
      this.tableData = table.map((bid: any) => {
        return {
          ...bid,
          paypalConfig: {
            currency: 'EUR',
            clientId: 'AU6MFRGR5-BWiQ_iCfICnKGd1zrbByiUNjgP34OQIQxylWT9t0jjcXZVO1NlR68L6Svpp2jUkaNUwTHW',
            createOrderOnClient: (data: any) =>
              <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: bid.amount, // TODO: bid value
                      breakdown: {
                        item_total: {
                          currency_code: 'EUR',
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
              layout: 'vertical',
            },
            onApprove: (data: any, actions: any) => {
              // TODO: send on be to update bid to paymentDone: true
              console.log('done', data, actions);
              // http.post('bids/{bid.id}')
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
