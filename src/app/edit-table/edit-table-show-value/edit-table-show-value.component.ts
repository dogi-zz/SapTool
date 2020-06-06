import { Component, OnInit, Input } from '@angular/core';
import { TableInfoColumn } from 'src/app/api-data.service';

@Component({
  selector: 'app-edit-table-show-value',
  templateUrl: './edit-table-show-value.component.html',
  styleUrls: ['./edit-table-show-value.component.scss']
})
export class EditTableShowValueComponent implements OnInit {

  @Input()
  col: TableInfoColumn;

  @Input()
  value: string | number | boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
