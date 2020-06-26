import { AbstractControl } from '@angular/forms';

export class SkillsValidators {
  static count(numberOfSkillsInherited: number) {
    return (control: AbstractControl) => {
      const skillsSelected = control.value.length;
      const difference = skillsSelected - numberOfSkillsInherited;
      const absDifference = Math.abs(difference);
      if (difference >= 1)
        return { over: absDifference };
      else if (difference <= -1)
        return { under: absDifference };
      else
        return null;
    };
  }
}
