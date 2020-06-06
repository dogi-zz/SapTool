import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  page: number;

  @Input()
  pageCount: number;

  pages: number[] = [];

  @Output() pageChange = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update() {
    this.pages = [];
    if (this.pageCount) {
      for (let i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
      }
    }
    if (this.pages.length > 10) {
      if (this.page <= 5) {
        this.pages = this.pages.slice(0, 10);
        this.pages[this.pages.length - 1] = null;
      }
      else if (this.page >= this.pageCount - 5) {
        this.pages = this.pages.slice(this.pageCount - 10);
        this.pages[0] = null;
      }
      else {
        this.pages = this.pages.slice(this.page - 5, this.page + 5);
        this.pages[0] = null;
        this.pages[this.pages.length - 1] = null;
      }
    }
  }

  select(page: number) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
}
