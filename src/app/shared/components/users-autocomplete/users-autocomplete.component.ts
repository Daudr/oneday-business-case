import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@models';
import { delay, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-autocomplete',
  templateUrl: './users-autocomplete.component.html',
  styleUrls: ['./users-autocomplete.component.scss'],
})
export class UsersAutocompleteComponent implements OnInit, OnDestroy {
  @Input() users: User[];
  @Output() userChange = new EventEmitter<string>();

  userControl = new FormControl();
  private destroyed$ = new Subject<boolean>();

  ngOnInit() {
    this.userControl.valueChanges.pipe(
      // delay(2000),
      tap(this.userChange.emit),
      tap(console.log),
      takeUntil(this.destroyed$)
    ).subscribe(value => console.log(value));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
