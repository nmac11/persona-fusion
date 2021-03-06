import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from '../routing/routing.module';
import { CompendiumService } from '../services/compendium.service';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
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
import { P3P_CONFIG } from './p3p-config';
import { PersonaeModule } from '../personae/personae.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoutingModule,
    SettingsModule,
    MyListModule,
    P3P4SimulatorModule,
    PersonaeModule,
  ],
  providers: [
    CompendiumService,
    PersonaStoreService,
    SkillService,
    SkillInheritanceService,
    P3P4FusionChartService,
    { provide: FusionChartService, useClass: P3P4FusionChartService },
    { provide: GAME_CONFIG, useValue: P3P_CONFIG },
  ],
})
export class P3PModule {}
