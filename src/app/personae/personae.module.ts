import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonaListComponent } from './components/persona-list/persona-list.component';
import { MaterialModule } from '../material/material.module';
import { PersonaComponent } from './components/persona/persona.component';
import { NormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { TriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { SharedModule } from '../shared/shared.module';
import { GemFusionsComponent } from './components/gem-fusions/gem-fusions.component';
import { SpecialFusionComponent } from './components/special-fusion/special-fusion.component';
import { PersonaeComponent } from './personae.component';

@NgModule({
  declarations: [
    PersonaeComponent,
    PersonaListComponent,
    PersonaComponent,
    NormalFusionsComponent,
    TriangleFusionsComponent,
    GemFusionsComponent,
    SpecialFusionComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
})
export class PersonaeModule {}
