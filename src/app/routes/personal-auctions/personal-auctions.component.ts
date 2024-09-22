import { Component } from '@angular/core';
import {AuctionsService} from "../../services/auctions.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BidsService} from "../../services/bids.service";
import {DialogModule} from "primeng/dialog";
import {TableComponent} from "../../components/table/table.component";

@Component({
  selector: 'app-personal-auctions',
  standalone: true,
  imports: [DialogModule, TableComponent, ReactiveFormsModule],
  templateUrl: './personal-auctions.component.html',
  styleUrl: './personal-auctions.component.scss',
})
export class PersonalAuctionsComponent {
  addNewAuctionForm: FormGroup;
  addDialogVisible: boolean = false;
  bidDialogVisible: boolean = false;
  tableData: any;
  auctionId: number = 0;
  detailObject: any;

  constructor(
    private fb: FormBuilder,
    private auctionsService: AuctionsService,
    private bidsService: BidsService,
  ) {
    this.addNewAuctionForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startingPrice: ['', Validators.required],
      endTime: ['', Validators.required],
      images: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.auctionsService.getAuctionsForUser().subscribe((table: any) => {
      this.tableData = table;
    });
  }

  addNewAuction() {
    const createAuctionData = this.addNewAuctionForm.getRawValue();
    const imgArr = [];
    imgArr.push({ value: createAuctionData.images });
    delete createAuctionData.images;
    createAuctionData.images = imgArr;
    this.auctionsService
      .createAuction(createAuctionData)
      .subscribe((res: any) => {
        this.addDialogVisible = false;
        this.getTable();
      });
  }

  openDetails(itemId: number) {
    this.bidDialogVisible = true;
    this.auctionId = itemId;
    this.detailObject = this.tableData.filter((x: any) => x.id === itemId)[0];
  }

  delete(auctionId: number) {
    this.auctionsService.deleteAuction(auctionId).subscribe((res: any) => {
      this.bidDialogVisible = false;
      this.getTable();
    })
  }
}
