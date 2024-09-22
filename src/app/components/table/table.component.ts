import { Component, Input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ButtonModule, DataViewModule, DropdownModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input()
  tableTitle: string = '';

  @Input()
  data: any[] = [];

  @Input()
  showBidButton: boolean = false;

  sortOrder: number = 0;
  sortField: string = '';
  sortByBidOptions: any[] =[];

  onAddNew = output();
  onOpenDetails = output<number>();

  ngOnInit() {
    this.sortByBidOptions = [
      {label: 'Last Bid High to Low', value: '!lastBidAmount'},
      {label: 'Last Bid Low to High', value: 'lastBidAmount'},
    ]
  }

  onSortChange(event: any) {
    console.log('event ', event, event.target.value);
    // let value = event.value;
    //
    // if (value.indexOf('!') === 0) {
    //   this.sortOrder = -1;
    //   this.sortField = value.substring(1, value.length);
    // } else {
    //   this.sortOrder = 1;
    //   this.sortField = value;
    // }
  }

  addNew() {
    this.onAddNew.emit();
  }

  openDetails(itemId: number) {
    this.onOpenDetails.emit(itemId);
  }
}
