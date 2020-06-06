import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditTableEditValueComponent } from './edit-table-edit-value.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    EditTableEditValueComponent
  ],
  exports: [
    EditTableEditValueComponent
  ],
})
export class EditTableEditValueModule { }
