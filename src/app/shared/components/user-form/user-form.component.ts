import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { User } from '@models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnChanges {
  @Input() user: User;
  @Output() save = new EventEmitter<User>();

  EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public form: FormGroup = this.fb.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl(new Date(), Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]),
  });

  get name() {
    return this.form.get('name');
  }

  get surname() {
    return this.form.get('surname');
  }

  get birthDate() {
    return this.form.get('birthDate');
  }

  get email() {
    return this.form.get('email');
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && this.user) {
      this.form.patchValue(this.user);
    }
  }

  onSaveUser() {
    const user = this.form.getRawValue();
    user.id = this.user.id ? this.user.id : null;

    this.save.emit(user);
  }
}
