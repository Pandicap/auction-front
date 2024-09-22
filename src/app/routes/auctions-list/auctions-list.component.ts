import { Component, output } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import {
  FormBuilder,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuctionsService } from '../../services/auctions.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BidsService } from '../../services/bids.service';
import {FileUploadHandlerEvent} from "primeng/fileupload";

@Component({
  selector: 'app-auctions-list',
  standalone: true,
  imports: [
    TableComponent,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './auctions-list.component.html',
  styleUrl: './auctions-list.component.scss',
})
export class AuctionsListComponent {
  addNewAuctionForm: FormGroup;
  bidForm: FormGroup;
  addDialogVisible: boolean = false;
  bidDialogVisible: boolean = false;
  tableData: any;
  auctionId: number = 0;
  detailObject: any;
  imageUrl: string = '';

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
    });
    this.bidForm = fb.group({
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.auctionsService.getAuctions().subscribe((res: any) => {
      console.log(res);
      this.tableData = res;
    });
  }

  addNewAuction() {
    const createAuctionData = this.addNewAuctionForm.getRawValue();
    delete createAuctionData.images;
    createAuctionData.images = this.imageUrl;
    this.auctionsService
      .createAuction(createAuctionData)
      .subscribe((res: any) => {
        this.addDialogVisible = false;
        this.getTable();
      });
  }

  onUpload(event: any) {
    console.log('onUpload', event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
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

  openDetails(itemId: number) {
    this.bidDialogVisible = true;
    this.auctionId = itemId;
    this.detailObject = this.tableData.filter((x: any) => x.id === itemId)[0];
  }
}
