import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columsToDisplay: string[] = ['name', 'surname', 'birthDate', 'email'];
  users$: Observable<User[]>;
  users = [{ name: 'Michele', surname: 'Da Rin', birthDate: '1997-02-16', email: 'michidarin@gmail.com' }];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

}
