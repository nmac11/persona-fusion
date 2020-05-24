import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3PComponent } from './p3p.component';
import { P3PRoutingModule } from './p3p-routing.module';
import { CompendiumService } from './services/compendium.service';
import { ListComponent } from './components/list/list.component';
import { FusionService } from './services/fusion.service';
import { FusionsComponent } from './components/fusions/fusions.component';

@NgModule({
  declarations: [P3PComponent, ListComponent, FusionsComponent],
  imports: [CommonModule, P3PRoutingModule],
  providers: [CompendiumService, FusionService],
})
export class P3PModule {}
