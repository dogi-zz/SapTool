import { Component } from '@angular/core';
import { SaveLoadService } from './save-load.service';
import { ApiDataService } from './api-data.service';
import { EditService } from './edit.service';


//const LOAD_TABLE_URL = BASE_URL + 'orders/info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'SapTool';


  // Liste von allen bekannten Tabellen
  public tables: string[] = [];

  // Tabellenname der mit der SelectBox verbunden ist
  public tableToLoad: string = null;

  constructor(
    private saveLoadService: SaveLoadService,
    private apiDataService: ApiDataService,
    public editService: EditService,
  ) {
    apiDataService.loadTables().then(tables => {
      this.tables = tables as string[];
    });
  }

}
