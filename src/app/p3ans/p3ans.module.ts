import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../routing/routing.module';
import { CompendiumService } from '../services/compendium.service';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameModule } from '../game/game.module';
import { MyListModule } from '../my-list/my-list.module';
import { PersonaStoreService } from '../services/persona-store.service';
import { SkillService } from '../services/skill.service';
import {
  FusionChartService,
  P3P4FusionChartService,
} from '../services/fusion-chart.service';
import { SettingsModule } from '../settings/settings.module';
import { P3P4SimulatorModule } from '../simulator/p3-p4-simulator.module';
import { SkillInheritanceService } from '../services/skill-inheritance.service';
import { P3ANS_CONFIG } from './p3ans-config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoutingModule,
    GameModule,
    SettingsModule,
    MyListModule,
    P3P4SimulatorModule,
  ],
  providers: [
    CompendiumService,
    PersonaStoreService,
    SkillService,
    SkillInheritanceService,
    P3P4FusionChartService,
    { provide: FusionChartService, useClass: P3P4FusionChartService },
    { provide: GAME_CONFIG, useValue: P3ANS_CONFIG },
  ],
})
export class P3ANSModule {}
