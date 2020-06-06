import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableInfoColumn } from 'src/app/api-data.service';

@Component({
  selector: 'app-edit-table-header-value',
  templateUrl: './edit-table-header-value.component.html',
  styleUrls: ['./edit-table-header-value.component.scss']
})
export class EditTableHeaderValueComponent implements OnInit {

  @Input()
  col: TableInfoColumn;

  filterValue: string;

  @Output()
  filterChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  filterChanged() {
    this.filterChange.emit(this.filterValue);
  }

}
