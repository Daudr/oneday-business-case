import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '@models';
import { UsersService } from '@services/users.service';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id !== `new`) {
      this.user$ = this.usersService.getUser(this.route.snapshot.params.id);
    } else {
      this.user$ = of({ id: null, name: '', surname: '', birthDate: new Date(), email: '' });
    }
  }

  onSave(user: User) {
    this.usersService.saveUser(user).pipe(takeUntil(this.destroyed$), tap(_ => this.router.navigate([`..`]))).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
