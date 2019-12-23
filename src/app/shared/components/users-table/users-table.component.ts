import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent {
  @Input() users: User[];
  @Input() columnsToDisplay: string[];

  @Output() addUserClick = new EventEmitter<void>();

  public onAddUserClick() {
    this.addUserClick.emit();
  }
}
