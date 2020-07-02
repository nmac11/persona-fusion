import { AbstractControl } from '@angular/forms';
import { PersonaStoreService } from '../services/persona-store.service';

export class SaveNameValidators {
  static availability(storeService: PersonaStoreService) {
    return async (control: AbstractControl) => {
      const name = control.value;
      const existing = await storeService.load(name);
      return existing ? { unavailable: true } : null;
    };
  }
}
