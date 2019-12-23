import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
