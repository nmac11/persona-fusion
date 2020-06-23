import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../models/persona';

@Component({
  selector: 'shared-persona-info',
  templateUrl: './persona-info.component.html',
  styleUrls: ['./persona-info.component.css'],
})
export class PersonaInfoComponent implements OnInit {
  @Input('persona') persona: Persona;

  constructor() {}

  ngOnInit(): void {}

  stats(): Object {
    return Object.keys(this.persona?.stats);
  }

  affinities(): Object {
    return Object.keys(this.persona?.affinities);
  }

  skills(): string {
    return this.persona?.skills
      .filter((s) => s.level === 0)
      .map((s) => s.name)
      .join(', ');
  }
}
