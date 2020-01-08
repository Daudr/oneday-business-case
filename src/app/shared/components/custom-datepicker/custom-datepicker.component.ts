import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  Optional,
  Self,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomDatepickerComponent,
    },
  ],
})
export class CustomDatepickerComponent implements OnDestroy, MatFormFieldControl<Date>, ControlValueAccessor {
  static nextId = 0;

  @Input() name: string;

  @Input()
  set value(value: Date) {
    this._value = value;
    this.stateChanges.next();

    console.log(this._value);
  }
  get value() {
    return this._value;
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  stateChanges = new Subject<void>();

  get empty() {
    return !this._value;
  }

  @HostBinding() id = `custom-datepicker-${CustomDatepickerComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  focused = false;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  errorState = false;
  controlType = `custom-datepicker`;

  @HostBinding('attr.aria-describedby') describedBy = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  private _value: Date;
  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  ngOnDestroy() {
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
