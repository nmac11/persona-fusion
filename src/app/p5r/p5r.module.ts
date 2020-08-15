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
  P5FusionChartService,
} from '../services/fusion-chart.service';
import { SettingsModule } from '../settings/settings.module';
import { P5SimulatorModule } from '../simulator/p5-simulator.module';
import { SkillInheritanceService } from '../services/skill-inheritance.service';
import { P5R_CONFIG } from './p5r-config'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoutingModule,
    GameModule,
    SettingsModule,
    MyListModule,
    P5SimulatorModule,
  ],
  providers: [
    CompendiumService,
    PersonaStoreService,
    SkillService,
    SkillInheritanceService,
    P5FusionChartService,
    { provide: FusionChartService, useClass: P5FusionChartService },
    { provide: GAME_CONFIG, useValue: P5R_CONFIG },
  ],
})
export class P5RModule {}
