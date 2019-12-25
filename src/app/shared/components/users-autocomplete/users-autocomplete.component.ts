import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@models';
import { tap, takeUntil, debounce } from 'rxjs/operators';
import { Subject, interval } from 'rxjs';

@Component({
  selector: 'app-users-autocomplete',
  templateUrl: './users-autocomplete.component.html',
  styleUrls: ['./users-autocomplete.component.scss'],
})
export class UsersAutocompleteComponent implements OnInit, OnDestroy {
  @Input() users: User[];
  @Output() userChange = new EventEmitter<string>();
  @Output() selectUser = new EventEmitter<User>();

  userControl = new FormControl();
  private destroyed$ = new Subject<boolean>();

  ngOnInit() {
    this.userControl.valueChanges.pipe(
      debounce(() => interval(1000)),
      tap(value => this.userChange.emit(value)),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  onUserSelect(user: User) {
    this.selectUser.emit(user);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
