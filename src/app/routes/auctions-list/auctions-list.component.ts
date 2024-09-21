import { Component, output } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuctionsService} from "../../services/auctions.service";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-auctions-list',
  standalone: true,
  imports: [TableComponent, DialogModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './auctions-list.component.html',
  styleUrl: './auctions-list.component.scss',
})
export class AuctionsListComponent {
  addNewAuctionForm: FormGroup;
  editAuctionForm: FormGroup;
  addDialogVisible: boolean = false;
  tableData: any;

  constructor(
    private fb: FormBuilder,
    private auctionService: AuctionsService,
  ) {
    this.addNewAuctionForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startingPrice: ['', Validators.required],
      endTime: ['', Validators.required],
      images: ['', Validators.required],
    });
    this.editAuctionForm = fb.group({});
  }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe((res: any) => {
      console.log(res)
      this.tableData = res;
    })
  }

  addNewAuction() {
    const createAuctionData = this.addNewAuctionForm.getRawValue();
    const imgArr = []
    imgArr.push({value: createAuctionData.images});
    delete createAuctionData.images;
    createAuctionData.images = imgArr;
    this.auctionService
      .createAuction(createAuctionData)
      .subscribe((res: any) => {
        console.log(res);
        this.addDialogVisible = false;
      });
  }

  editAuction() {}

  openDetails(itemId: number) {

  }
}
