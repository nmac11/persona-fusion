import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorPagesModule } from './simulator-pages.module';
import { P5SimulatorService, SimulatorService } from '../services/simulator.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SimulatorPagesModule],
  providers: [{ provide: SimulatorService, useClass: P5SimulatorService }],
})
export class P5SimulatorModule {}
