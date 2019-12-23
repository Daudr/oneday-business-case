import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from '@components/users-table/users-table.component';
import { MaterialModule } from '@modules/material/material.module';
import { UsersAutocompleteComponent } from '@components/users-autocomplete/users-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserFormComponent } from '@components/user-form/user-form.component';

@NgModule({
  declarations: [UsersTableComponent, UsersAutocompleteComponent, UserFormComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    UsersTableComponent,
    UsersAutocompleteComponent,
    UserFormComponent,
  ],
})
export class SharedModule {}
