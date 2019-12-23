import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from '@components/users-table/users-table.component';
import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  declarations: [UsersTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    UsersTableComponent
  ]
})
export class SharedModule { }
