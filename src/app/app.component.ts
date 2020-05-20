import { Component } from '@angular/core';
import { SaveLoadService } from './save-load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'SapTool';

  public jsonData: any[] = null;

  public tableToLoad: string;

  constructor(
    private saveLoadService: SaveLoadService,
  ) {
  }

  back() {
    this.jsonData = null;
  }

  saveData() {
    console.info("save");
    console.info(this);
  }

  loadData() {
    this.saveLoadService.load(this.tableToLoad).then(data => {
      this.jsonData = <any[]>data;
    });
  }
}
