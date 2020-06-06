import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableInfoColumn } from 'src/app/api-data.service';

@Component({
  selector: 'app-edit-table-edit-value',
  templateUrl: './edit-table-edit-value.component.html',
  styleUrls: ['./edit-table-edit-value.component.scss']
})
export class EditTableEditValueComponent implements OnInit {

  @Input()
  col: TableInfoColumn;

  @Input()
  value: string;

  @Input()
  originalValue: string | number | boolean;


  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeValue() {
    this.valueChange.emit(this.value);
  }

}
