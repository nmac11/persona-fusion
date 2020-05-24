import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3PComponent } from './p3p.component';
import { P3PRoutingModule } from './p3p-routing.module';
import { CompendiumService } from './services/compendium.service';
import { ListComponent } from './components/list/list.component';
import { FusionsComponent } from './components/fusions/fusions.component';
import { NormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { ArcanaFusionService } from './services/arcana-fusion.service';

@NgModule({
  declarations: [
    P3PComponent,
    ListComponent,
    FusionsComponent,
    NormalFusionsComponent,
  ],
  imports: [CommonModule, P3PRoutingModule],
  providers: [CompendiumService, ArcanaFusionService],
})
export class P3PModule {}
