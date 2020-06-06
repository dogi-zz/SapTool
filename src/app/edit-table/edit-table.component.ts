import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiDataService, TableInfoColumn } from '../api-data.service';
import { EditService } from '../edit.service';

const PAGE_SIZE = 10;

type ItemType = { [colname: string]: string | number | boolean };

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit, OnChanges {

  @Input()
  public tableName: string;

  tableInfo: TableInfoColumn[];
  pageCount = 1;
  page = 1;

  // Das erste ist das OriginalItem, das zweite ist (falls im editiermodus) das editierte
  public filteredData: [ItemType, ItemType][] = [];
  public newData: ItemType[] = [];
  public canSave = false;

  public filterValues: { [colname: string]: string } = {};

  constructor(
    private cd: ChangeDetectorRef,
    private apiDataService: ApiDataService,
    private editService: EditService,
  ) { }

  ngOnInit(): void {
    this.rebuildColumns();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildColumns();
  }

  rebuildColumns() {
    this.filterValues = {};
    this.apiDataService.loadTableInfo(this.tableName).then(tableInfo => {
      this.tableInfo = tableInfo;
      this.tableInfo.forEach(col => {
        this.filterValues[col.name] = '';
      });
      this.loadPage(1);
    });
  }

  update() {
    this.loadPage(this.page);
  }

  loadPage(page: number) {
    this.newData = this.editService.getNewData(this.tableName);
    this.apiDataService.loadTableData(this.tableName, page, PAGE_SIZE, this.filterValues).then(dataresponse => {
      this.page = page;
      this.pageCount = Math.ceil(dataresponse.count / 10);
      this.filteredData = dataresponse.data.map(item => {
        if (this.editService.isEdit(this.tableName, item)) {
          return [item, this.editService.getEdit(this.tableName, item)];
        } else {
          return [item, null];
        }
      });
    });
    this.canSave = this.editService.canSave(this.tableName);
  }

  filterChanged(col: TableInfoColumn, value: string) {
    this.filterValues[col.name] = value;
    this.loadPage(1);
  }


  addItem() {
    let newItem: ItemType = {};
    this.tableInfo.forEach(property => {
      if (property.type === 'string') {
        newItem[property.name] = '';
      }
      if (property.type === 'number') {
        newItem[property.name] = 0;
      }
      if (property.type === 'boolean') {
        newItem[property.name] = false;
      }
    });
    this.editService.addItem(this.tableName, newItem);
    // Update der Anzeige
    this.newData = this.editService.getNewData(this.tableName);
    this.canSave = true;
  }

  editItem(extItem: [ItemType, ItemType]) {
    if (this.editService.isEdit(this.tableName, extItem[0])) {
      return;
    }
    this.editService.editItem(this.tableName, extItem[0]);
    this.update();
    this.canSave = true;
  }

  valueChange(row: ItemType) {
    this.editService.changeItem(this.tableName, row)
  }


  saveNewItem(row: ItemType) {
    this.editService.saveNewItem(this.tableName, row).then(()=>{
      this.update();
    });
  }
  
  updateItem(extItem: [ItemType, ItemType]) {
    this.editService.updateItem(this.tableName, extItem[0], extItem[1]).then(()=>{
      this.update();
    });
  }

  
  saveAll(){
    this.editService.saveAll(this.tableName).then(()=>{
      this.update();
    });
  }


}
