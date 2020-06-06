import { Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';


type ItemType = { [colname: string]: string | number | boolean };

@Injectable({
  providedIn: "root"
})
export class EditService {


  public newData: { [colname: string]: ItemType[] } = {};
  public editData: { [colname: string]: [ItemType, ItemType][] } = {};


  constructor(
    private apiDataService: ApiDataService,
  ) {

  }

  getNewData(tableName: string): ItemType[] {
    if (!this.newData[tableName]) {
      return [];
    }
    return this.newData[tableName];
  }

  addItem(tableName: string, item: ItemType) {
    if (!this.newData[tableName]) { this.newData[tableName] = []; }
    this.newData[tableName].push(item);
  }

  editItem(tableName: string, item: ItemType) {
    if (!this.editData[tableName]) { this.editData[tableName] = []; }
    // Ein Klon des Originalwerts wird in die Editliste Übernommen
    this.editData[tableName].push([item, Object.assign({}, item)]);
  }

  isEdit(tableName: string, originalItem: ItemType) {
    if (!this.editData[tableName]) { return false; }
    return this.getEdit(tableName, originalItem) ? true : false;
  }

  getEdit(tableName: string, originalItem: ItemType): ItemType {
    if (!this.editData[tableName]) { return null; }
    let found = this.editData[tableName].find(i => JSON.stringify(i[0]) === JSON.stringify(originalItem));
    return found ? found[1] : null;
  }

  changeItem(tableName: string, item: ItemType) {
    // zum akktuellen Implementierungsstand noch nichts
  }

  canSave(tableName: string): boolean {
    if (this.newData[tableName] && this.newData[tableName].length) { return true; }
    if (this.editData[tableName] && this.editData[tableName].length) { return true; }
    return false;
  }

  saveNewItem(tableName: string, item: ItemType) {
    if (this.newData[tableName] && this.newData[tableName].includes(item)) {
      this.newData[tableName].splice(this.newData[tableName].indexOf(item), 1);
      return this.apiDataService.newItem(tableName, item);
    }
    return Promise.reject();
  }

  updateItem(tableName: string, original: ItemType, item: ItemType) {
    if (this.editData[tableName]) {
      let found = this.editData[tableName].find(i => JSON.stringify(i[0]) === JSON.stringify(original));
      if (found) {
        return this.apiDataService.updateItem(tableName, original, item);
      }
    }
    return Promise.reject();
  }

  saveAll(tableName: string) {
    let promises: Promise<any>[] = [];
    if (this.newData[tableName]) {
      this.newData[tableName].forEach(newItem => {
        promises.push(this.saveNewItem(tableName, newItem));
      })
    }
    if (this.editData[tableName]) {
      this.editData[tableName].forEach(fromToItem => {
        promises.push(this.updateItem(tableName, fromToItem[0], fromToItem[1]));
      });
    }
    return Promise.all(promises).then(() => {
      this.newData[tableName] = [];
      this.editData[tableName] = [];
    });
  }


}