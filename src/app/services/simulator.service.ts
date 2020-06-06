import { Injectable, Inject } from '@angular/core';
import { FusionChartService } from './fusion-chart.service';
import { CompendiumService } from './compendium.service';

@Injectable()
export class SimulatorService {
  constructor(
    @Inject(FusionChartService) private fusionChartService: FusionChartService,
    @Inject(CompendiumService) private compendiumService: CompendiumService,
  ) {}
}
