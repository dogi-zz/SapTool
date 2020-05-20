import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit, OnChanges {

  @Input()
  public jsonData: any[] = [];

  public filteredData: any[] = [];

  public headers = [];
  public headerFilters: { [header: string]: string } = {};

  public elementToEdit = null;
  public columnToEdit = null;

  editValue = 'test';

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.update();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update() {
    // initialisieren der Container
    this.headers = [];
    this.headerFilters = {};
    // Die Headers anhand der Inhalte der Objekte ermitteln
    this.jsonData.forEach(row => {
      Object.keys(row).forEach(colName => {
        if (!this.headers.includes(colName)) {
          this.headers.push(colName);
          this.headerFilters[colName] = '';
        }
      });
    });
    // die gefilterten Daten erstmal auf "alles" setzen
    this.filteredData = this.jsonData.filter(item => true);
  }

  updateFilter() {
    // Suche die Keys 
    let keys = Object.keys(this.headerFilters).filter(key => this.headerFilters[key]);
    this.filteredData = this.jsonData.filter(item => {
      let isVisible = true;
      keys.forEach(key => {
        if (!item[key].toLowerCase().includes(this.headerFilters[key].toLowerCase())) { isVisible = false; }
      });
      return isVisible;
    });
  }

  newEntry() {
    let newItem = {};
    this.headers.forEach(header => {
      newItem[header] = 'value for ' + header;
    });
    this.jsonData.push(newItem);
  }

  startEdit(row: any, header: string) {
    if (this.elementToEdit) {
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

  activateFilter(header) {
    this.headerFilters[header] = '';
  }

}
