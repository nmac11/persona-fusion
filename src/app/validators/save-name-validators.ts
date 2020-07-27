import { AbstractControl } from '@angular/forms';
import { PersonaStoreService } from '../services/persona-store.service';

export class SaveNameValidators {
  static availability(storeService: PersonaStoreService) {
    return async (control: AbstractControl) => {
      const name = control.value.trim();
      const existing = await storeService.loadByName(name);
      return existing ? { unavailable: true } : null;
    };
  }

  static empty = (control: AbstractControl) => {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { empty: true };
  };
}
