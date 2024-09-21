import {Component, Input, output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {TagModule} from "primeng/tag";
import {DataViewModule} from "primeng/dataview";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ButtonModule, TagModule, DataViewModule, NgClass, NgForOf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input()
  data: any[] = [];

  onAddNew = output();
  onEdit = output<number>();
  onOpenDetails = output<number>();

  addNew() {
    this.onAddNew.emit();
  }

  edit(id: number) {
    this.onEdit.emit(id);
  }

  openDetails(itemId: number) {
    this.onOpenDetails.emit(itemId);
  }
}
