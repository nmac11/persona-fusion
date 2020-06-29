import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[changeDebouncer]',
})
export class ChangeDebouncerDirective implements OnDestroy {
  @Output() debouncedChange: EventEmitter<string> = new EventEmitter();
  private subject: Subject<string> = new Subject();

  constructor() {
    this.subject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((t) => this.debouncedChange.emit(t));
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  @HostListener('change', ['$event.target.value'])
  onChange(text: string): void {
    this.subject.next(text);
  }
}
