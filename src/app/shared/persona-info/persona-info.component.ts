import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../models/persona';
import { AppSettingsService } from '../../services/app-settings.service';

@Component({
  selector: 'shared-persona-info',
  templateUrl: './persona-info.component.html',
  styleUrls: ['./persona-info.component.css'],
})
export class PersonaInfoComponent implements OnInit {
  @Input('persona') persona: Persona;

  constructor(private appSettingsService: AppSettingsService) {}

  ngOnInit(): void {}

  stats(): Object {
    return Object.keys(this.persona?.stats);
  }

  affinities(): Object {
    return Object.keys(this.persona?.affinities);
  }

  skills(): string {
    return this.persona?.skills
      .map((s) => s.name)
      .join(', ');
  }

  expanded: () => boolean = () => {
    return this.appSettingsService.getValues()['EXPANDDETAILS'];
  };
}
