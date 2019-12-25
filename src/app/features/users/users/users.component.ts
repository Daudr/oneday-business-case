import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '@services/users.service';
import { User } from '@models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allColumns = ['name', 'surname', 'birthDate', 'email', 'modify'];
  columnsToDisplay: string[] = this.allColumns;
  users$: Observable<User[]>;
  filteredUsers$: Observable<User[]>;

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

  filterUsers(filter: string) {
    this.filteredUsers$ = this.usersService.autocomplete(filter);
  }

  goToUserDetail(userID = null) {
    if (!userID) {
      userID = `new`;
    }

    this.router.navigate(['/users', userID]);
  }
}
