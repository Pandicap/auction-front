import { Component } from '@angular/core';
import { BidsService } from '../../services/bids.service';
import { BidsTableComponent } from '../../components/bids-table/bids-table.component';
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-personal-bids',
  standalone: true,
  imports: [BidsTableComponent, DialogModule, ReactiveFormsModule],
  templateUrl: './personal-bids.component.html',
  styleUrl: './personal-bids.component.scss',
})
export class PersonalBidsComponent {
  tableData: any[] = [];
  detailObject: any;
  bidDialogVisible: boolean = false;
  auctionId: number = 0;
  bidForm: FormGroup;


  constructor(private bidsService: BidsService, private fb: FormBuilder) {
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
      this.tableData = table;
    });
  }

  openDetails(itemId: number) {
    this.bidDialogVisible = true;
    this.auctionId = itemId;
    this.detailObject = this.tableData.filter((x: any) => x.auction.id === itemId)[0];
    console.log(this.detailObject);
  }

  bid() {
    let bidData = this.bidForm.getRawValue();
    bidData.time = 'now';
    bidData.auctionId = this.auctionId;
    this.bidsService.createBid(bidData).subscribe((res: any) => {
      this.bidDialogVisible = false;
      this.getTable();
    })
  }

  delete() {
    this.bidsService.deleteBid(this.detailObject.id).subscribe((res: any) => {
      this.bidDialogVisible = false;
      this.getTable();
    })
  }
}
