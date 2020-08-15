import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorPagesModule } from './simulator-pages.module';
import {
  P3P4SimulatorService,
  SimulatorService,
} from '../services/simulator.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SimulatorPagesModule],
  providers: [{ provide: SimulatorService, useClass: P3P4SimulatorService }],
})
export class P3P4SimulatorModule {}
