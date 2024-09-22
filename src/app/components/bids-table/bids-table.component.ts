import {Component, Input, output} from '@angular/core';
import {DataViewModule} from "primeng/dataview";
import {PrimeTemplate} from "primeng/api";

@Component({
  selector: 'app-bids-table',
  standalone: true,
  imports: [DataViewModule, PrimeTemplate],
  templateUrl: './bids-table.component.html',
  styleUrl: './bids-table.component.scss',
})
export class BidsTableComponent {
  @Input()
  data: any[] = [];
  onOpenDetails = output<number>();

  openDetails(auctionId: number) {
    this.onOpenDetails.emit(auctionId);
  }
}
