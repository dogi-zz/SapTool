import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {

  @Input()
  public jsonData: any[] = [];

  public headers = ['feld1', 'feld2', 'feld3'];


  public elementToEdit = null;
  public columnToEdit = null;

  editValue = 'test';

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  newEntry() {
    let newItem = {};
    this.headers.forEach(header => {
      newItem[header] = 'value for ' + header;
    });
    this.jsonData.push(newItem);
  }

  startEdit(row: any, header: string) {
    if (this.elementToEdit){
      this.set();
    }
    this.elementToEdit = row;
    this.columnToEdit = header;
    this.editValue = row[header];
  }

  set() {
    this.elementToEdit[this.columnToEdit] = this.editValue;
    this.elementToEdit = null;
    this.columnToEdit = null;
    this.editValue = null;
  }

  onKeyUp(event: any) {
    if (event.keyCode === 13) {
      this.set();
    }
  }

}
