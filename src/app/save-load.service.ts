import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: "root"
})
export class SaveLoadService {


    constructor(
        private http: HttpClient,
    ) {

    }


    load(tableToLoad: string) {
        return this.http.get('/assets/' + tableToLoad + '.json')
            .toPromise();
    }

}