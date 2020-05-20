import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditTableComponent } from './edit-table.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    EditTableComponent
  ],
  exports: [
    EditTableComponent
  ],
})
export class EditTableModule { }
