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
  selector: '[inputDebouncer]',
})
export class InputDebouncerDirective implements OnDestroy {
  @Output() debouncedInput: EventEmitter<string> = new EventEmitter();
  private subject: Subject<string> = new Subject();

  constructor() {
    this.subject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((t) => this.debouncedInput.emit(t));
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  @HostListener('input', ['$event.target.value'])
  onInput(text: string): void {
    this.subject.next(text);
  }
}
