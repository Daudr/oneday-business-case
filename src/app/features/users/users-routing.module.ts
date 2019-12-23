import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: `:id`,
    component: UserDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
