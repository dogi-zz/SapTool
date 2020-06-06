import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://cinbir.de/saptool/api/';
const LOAD_TABLE_URL = BASE_URL + 'tables';
const LOAD_TABLE_INFO_URL = BASE_URL + 'table/{table}/info';
const LOAD_TABLE_DATA_URL = BASE_URL + 'table/{table}/data?pagesize={pagesize}&page={page}';

const SAVE_NEW_ITEM_URL = BASE_URL + 'table/{table}/new';
const SAVE_UPDATE_ITEM_URL = BASE_URL + 'table/{table}/update';



@Injectable({
    providedIn: 'root'
})
export class ApiDataService {


    constructor(
        private http: HttpClient,
    ) {

    }


    loadTables() {
        return this.http.get<string[]>(LOAD_TABLE_URL).toPromise();
    }

    loadTableInfo(table: string) {
        let url = LOAD_TABLE_INFO_URL.replace('{table}', table);
        return this.http.get<TableInfoColumn[]>(url).toPromise();
    }

    loadTableData(table: string, page: number, pagesize: number, filterValues: { [colname: string]: string }): Promise<DataResponse> {
        let url = LOAD_TABLE_DATA_URL
            .replace('{table}', table)
            .replace('{page}', '' + page)
            .replace('{pagesize}', '' + pagesize)
            ;
        Object.entries(filterValues).forEach(entry => {
            if (typeof (entry[1]) === 'string') { entry[1] = entry[1].trim(); }
            if (!entry || !entry[1]) { return; }
            if (entry[1]) { url += '&filter_' + entry[0] + '=' + entry[1]; }
        });
        return this.http.get<DataResponse>(url).toPromise();
    }

    newItem(table: string, item: { [prop: string]: string | number | boolean }) {
        let url = SAVE_NEW_ITEM_URL
            .replace('{table}', table)
            ;
        let data: NewItemRequest = {
            action: 'new',
            data: item,
        };
        return this.http.post<any>(url, data).toPromise().then(res => {
            console.info(res);
        });
    }

    updateItem(table: string, originalItem: { [prop: string]: string | number | boolean }, item: { [prop: string]: string | number | boolean }) {
        let url = SAVE_UPDATE_ITEM_URL
            .replace('{table}', table)
            ;
        let data: UpdateItemRequest = {
            action: 'update',
            original: originalItem,
            data: item,
        };
        return this.http.post<any>(url, data).toPromise().then(res => {
            console.info(res);
        });
    }



}



export interface TableInfoColumn {
    name: string;
    type: 'string' | 'number' | 'boolean';
}


export interface DataResponse {
    count: number;
    data: { [prop: string]: string | number | boolean }[];
}

export interface NewItemRequest {
    action: 'new';
    data: { [prop: string]: string | number | boolean };
}

export interface UpdateItemRequest {
    action: 'update';
    original: { [prop: string]: string | number | boolean };
    data: { [prop: string]: string | number | boolean };
}
