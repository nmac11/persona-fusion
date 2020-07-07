import { Component, OnInit, Injector } from '@angular/core';
import { ActiveGameService } from '../services/active-game.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'settings-root',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settingsService: SettingsService;

  constructor(
    private injector: Injector,
    private activeGameService: ActiveGameService,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.settingsService = this.injector.get<SettingsService>(tokens.settings);
  }

  ngOnInit(): void {}
}
