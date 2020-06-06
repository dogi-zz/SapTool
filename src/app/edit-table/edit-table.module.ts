import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditTableComponent } from './edit-table.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { EditTableShowValueModule } from './edit-table-show-value/edit-table-show-value.module';
import { EditTableEditValueModule } from './edit-table-edit-value/edit-table-edit-value.module';
import { EditTableHeaderValueModule } from './edit-table-header-value/edit-table-header-value.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PaginatorModule,
    EditTableShowValueModule,
    EditTableEditValueModule,
    EditTableHeaderValueModule,
  ],
  declarations: [
    EditTableComponent
  ],
  exports: [
    EditTableComponent
  ],
})
export class EditTableModule { }
