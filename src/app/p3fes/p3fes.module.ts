import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3FESComponent } from './p3fes.component';
import { ListComponent } from './components/list/list.component';
import { P3FESRoutingModule } from './p3fes-routing.module';
import { p3fesCompendiumProvider } from './helpers/compendium-service-helper';

@NgModule({
  declarations: [P3FESComponent, ListComponent],
  imports: [CommonModule, P3FESRoutingModule],
  providers: [p3fesCompendiumProvider],
})
export class P3FESModule {}
