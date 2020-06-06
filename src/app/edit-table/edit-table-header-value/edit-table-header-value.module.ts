import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditTableHeaderValueComponent } from './edit-table-header-value.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    EditTableHeaderValueComponent
  ],
  exports: [
    EditTableHeaderValueComponent
  ],
})
export class EditTableHeaderValueModule { }
